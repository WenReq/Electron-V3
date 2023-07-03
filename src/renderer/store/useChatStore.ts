import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { ModelChat } from "../../model/ModelChat";
import { useMessageStore } from "./useMessageStore";

//初始化模拟数据
let prepareData = () => {
  let result = [];
  for (let i = 0; i < 10; i++) {
    let model = new ModelChat();
    model.fromName = "聊天对象" + i;
    model.sendTime = "昨天";
    model.lastMsg = "这是此会话的最后一条消息" + i;
    model.avatar = `https://pic3.zhimg.com/v2-306cd8f07a20cba46873209739c6395d_im.jpg?source=32738c0c`;
    result.push(model);
  }
  return result;
};
//定义一个Store
// 使用defineStore(name,function)的形式创建 Store，这种形式的 Store 叫作Setup Stores
export const useChatStore = defineStore("chat", () => {
  // data属性中，这是一个被Ref对象包裹着的数组，数组里的内容是我们通过prepareData方法模拟的（模拟了十个聊天会话对象）。
  let data: Ref<ModelChat[]> = ref(prepareData());
  // 这个 Store 还提供了一个Action方法：selectItem，这个方法用于选中某个具体的聊天会话。
  let selectItem = (item: ModelChat) => {
    if (item.isSelected) return;
    data.value.forEach((v) => (v.isSelected = false));
    item.isSelected = true;
    let messageStore = useMessageStore(); //新增的行
    messageStore.initData(item); //新增的行
  };
  return { data, selectItem };
});
