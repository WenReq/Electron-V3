<script setup lang="ts">
import { onMounted } from "vue";
import ChatItem from "./ChatItem.vue";
import ChatSearch from "./ChatSearch.vue";
import { useChatStore } from "../../../store/useChatStore";
let store = useChatStore();

onMounted(() => {
  //选中第七个会话
  store.selectItem(store.data[6]);
});
</script>
<template>
  <div class="ChatList">
    <ChatSearch />
    <div class="ListBox">
      <!-- store 对象是通过useChatStore方法获取的，useChatStore方法就是我们前面介绍的useChatStore.ts导出的方法。得到 store 对象之后，可以直接使用store.data获取 Store 对象里的数据。 -->
      <ChatItem :data="item" v-for="item in store.data" :key="item.id" />
    </div>
  </div>
</template>
<style scoped lang="scss">
.ChatList {
  width: 250px;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
}
.ListBox {
  background: rgb(230, 229, 229);
  background-image: linear-gradient(to bottom right, rgb(235, 234, 233), rgb(240, 240, 240));
  flex: 1;
  overflow-y: auto;
  box-sizing: border-box;

  border-right: 1px solid rgb(214, 214, 214);
}
</style>
