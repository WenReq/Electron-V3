/*
 * @Author: wenreq 294491328@qq.com
 * @Date: 2022-10-28 11:52:30
 * @LastEditors: wenreq 294491328@qq.com
 * @LastEditTime: 2023-07-03 15:02:02
 * @FilePath: /electron-jue-jin-dev/src/renderer/main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from "vue";
import "./assets/style.css";
import "./assets/icon/iconfont.css";
import App from "./App.vue";
import { router } from "./router";
import { createPinia } from "pinia";

createApp(App).use(createPinia()).use(router).mount("#app");
