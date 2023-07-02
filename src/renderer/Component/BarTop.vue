<!--
 * @Author: wenreq 294491328@qq.com
 * @Date: 2023-07-02 18:03:12
 * @LastEditors: wenreq 294491328@qq.com
 * @LastEditTime: 2023-07-02 22:21:03
 * @FilePath: /electron-jue-jin-dev/src/renderer/Component/BarTop.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import { onMounted, ref, onUnmounted } from "vue";
import { ipcRenderer } from "electron";
defineProps<{ title?: string }>();
let isMaximized = ref(false);
//关闭窗口
let closeWindow = () => {
  ipcRenderer.invoke("closeWindow");
};
//最大化窗口
let maxmizeMainWin = () => {
  ipcRenderer.invoke("maxmizeWindow");
};
//最小化窗口
let minimizeMainWindow = () => {
  ipcRenderer.invoke("minimizeWindow");
};
//还原窗口
let unmaximizeMainWindow = () => {
  ipcRenderer.invoke("unmaximizeWindow");
};
//窗口最大化事件
let winMaximizeEvent = () => {
  isMaximized.value = true;
};
//窗口取消最大化事件
let winUnmaximizeEvent = () => {
  isMaximized.value = false;
};
onMounted(() => {
  // 通过双击标题栏可拖拽区域触发的，所以这里我们只能通过ipcRenderer.on来监听窗口的最大化或还原事件，以此来改变对应的最大化或还原按钮的显隐状态。
  ipcRenderer.on("windowMaximized", winMaximizeEvent);
  ipcRenderer.on("windowUnmaximized", winUnmaximizeEvent);
});
// 由于多个二级路由页面会引用BarTop.vue，为了避免在切换路由的时候，反复通过ipcRenderer.on注册消息监听器，所以我们在组件的onUnmounted事件内注销了消息监听器，避免事件泄漏。
onUnmounted(() => {
  ipcRenderer.off("windowMaximized", winMaximizeEvent);
  ipcRenderer.off("windowUnmaximized", winUnmaximizeEvent);
});
</script>
<template>
  <div class="topBar">
    <div class="winTitle">{{ title }}</div>
    <div class="winTool">
      <div @click="minimizeMainWindow">
        <i class="icon icon-minimize" />
      </div>
      <div v-if="isMaximized" @click="unmaximizeMainWindow">
        <i class="icon icon-restore" />
      </div>
      <div v-else @click="maxmizeMainWin">
        <i class="icon icon-maximize" />
      </div>
      <div @click="closeWindow">
        <i class="icon icon-close" />
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.topBar {
  display: flex;
  height: 25px;
  line-height: 25px;
  -webkit-app-region: drag;
  width: 100%;
}
.winTitle {
  flex: 1;
  padding-left: 12px;
  font-size: 14px;
  color: #888;
}
.winTool {
  height: 100%;
  display: flex;
  -webkit-app-region: no-drag; /* 可拖拽区域内的不可拖拽区域 */
}
.winTool div {
  height: 100%;
  width: 34px;
  text-align: center;
  color: #999;
  cursor: pointer;
  line-height: 25px;
}
.winTool .icon {
  font-size: 10px;
  color: #666666;
  font-weight: bold;
}
.winTool div:hover {
  background: #efefef;
}
.winTool div:last-child:hover {
  background: #ff7875;
}
.winTool div:last-child:hover i {
  color: #fff !important;
}
</style>
