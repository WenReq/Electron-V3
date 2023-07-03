/*
 * @Author: wenreq 294491328@qq.com
 * @Date: 2022-10-28 11:52:30
 * @LastEditors: wenreq 294491328@qq.com
 * @LastEditTime: 2023-07-03 10:59:02
 * @FilePath: /electron-jue-jin-dev/src/main/mainEntry.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { app, BrowserWindow } from "electron";
import { CustomScheme } from "./CustomScheme";
import { CommonWindowEvent } from "./CommonWindowEvent";
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";

// 每当有一个窗口被创建成功后，这个事件就会被触发，主窗口和使用window.open创建的子窗口都一样
app.on("browser-window-created", (e, win) => {
  CommonWindowEvent.regWinEvent(win);
});

let mainWindow: BrowserWindow;

app.whenReady().then(() => {
  let config = {
    webPreferences: {
      frame: false,
      show: false, // 主窗口对象 mainWindow 初始化时，把配置属性 show 设置为 false，就可以让主窗口初始化成功后处于隐藏状态。接下来再在合适的时机让渲染进程控制主窗口显示出来即可。
      nodeIntegration: true,
      webSecurity: false,
      allowRunningInsecureContent: true,
      contextIsolation: false,
      webviewTag: true,
      spellcheck: false,
      disableHtmlFullscreenWindowResize: true,
    },
  };
  mainWindow = new BrowserWindow(config);
  mainWindow.webContents.openDevTools({ mode: "undocked" });
  /*
    argv: [
      '/Users/wenshaochang/Desktop/wen/self/myproject/electron/electron-jue-jin-dev/node_modules/electron/dist/Electron.app/Contents/MacOS/Electron',
      './dist/mainEntry.js',
      'http://127.0.0.1:5173'
    ],
  */

  if (process.argv[2]) {
    mainWindow.loadURL(process.argv[2]);
  } else {
    CustomScheme.registerScheme();
    mainWindow.loadURL(`app://index.html`);
  }

  CommonWindowEvent.listen();
});
