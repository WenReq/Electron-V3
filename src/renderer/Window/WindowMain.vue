<script setup lang="ts">
import { ipcRenderer } from "electron";
import { onMounted } from "vue";
import BarLeft from "../Component/BarLeft.vue";

onMounted(() => {
  // 在WindowMain.vue组件渲染完成之后让主窗口显示。showWindow事件是在我们上一节讲的CommonWindowEvent类注册的。
  ipcRenderer.invoke("showWindow");
});
</script>

<template>
  <BarLeft />
  <div class="pageBox">
    <router-view />
  </div>
</template>

<style scoped lang="scss">
.pageBox {
  flex: 1;
  height: 100%;
  border-top: 1px solid #e6e6e6;
  box-sizing: border-box;
  display: flex;
  margin-top: -1px;
}
</style>
