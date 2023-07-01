/*
 * @Author: wenreq 294491328@qq.com
 * @Date: 2022-10-28 11:52:30
 * @LastEditors: wenreq 294491328@qq.com
 * @LastEditTime: 2023-07-01 15:57:45
 * @FilePath: /electron-jue-jin-dev/src/main/mainEntry.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { app, BrowserWindow } from "electron";
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";
let mainWindow: BrowserWindow;

app.whenReady().then(() => {
  let config = {
    webPreferences: {
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
  mainWindow.loadURL(process.argv[2]);
});
