/*
 * @Author: wenreq 294491328@qq.com
 * @Date: 2023-07-02 21:58:01
 * @LastEditors: wenreq 294491328@qq.com
 * @LastEditTime: 2023-07-03 11:03:11
 * @FilePath: /electron-jue-jin-dev/src/main/CommonWindowEvent.ts
 * @Description: 管理应用窗口 window
 */
import { BrowserWindow, ipcMain, app } from "electron";
// 主进程公共消息处理逻辑
export class CommonWindowEvent {
  private static getWin(event: any) {
    return BrowserWindow.fromWebContents(event.sender);
  }
  public static listen() {
    ipcMain.handle("minimizeWindow", (e) => {
      this.getWin(e)?.minimize();
    });

    ipcMain.handle("maxmizeWindow", (e) => {
      this.getWin(e)?.maximize();
    });

    ipcMain.handle("unmaximizeWindow", (e) => {
      this.getWin(e)?.unmaximize();
    });

    ipcMain.handle("hideWindow", (e) => {
      this.getWin(e)?.hide();
    });

    ipcMain.handle("showWindow", (e) => {
      this.getWin(e)?.show();
    });

    ipcMain.handle("closeWindow", (e) => {
      this.getWin(e)?.close();
    });
    ipcMain.handle("resizable", (e) => {
      return this.getWin(e)?.isResizable();
    });
    ipcMain.handle("getPath", (e, name: any) => {
      return app.getPath(name);
    });
  }
  //主进程公共事件处理逻辑
  public static regWinEvent(win: BrowserWindow) {
    win.on("maximize", () => {
      win.webContents.send("windowMaximized");
    });
    win.on("unmaximize", () => {
      win.webContents.send("windowUnmaximized");
    });

    //@ts-ignore
    //注册打开子窗口的回调函数
    win.webContents.setWindowOpenHandler((param) => {
      // 基础窗口配置对象
      let config = {
        frame: false,
        show: true,
        parent: null,
        webPreferences: {
          nodeIntegration: true,
          webSecurity: false,
          allowRunningInsecureContent: true,
          contextIsolation: false,
          webviewTag: true,
          spellcheck: false,
          disableHtmlFullscreenWindowResize: true,
          nativeWindowOpen: true,
        },
      };
      // 开发者自定义窗口配置对象
      let features = JSON.parse(param.features);
      for (let p in features) {
        if (p === "webPreferences") {
          for (let p2 in features.webPreferences) {
            // @ts-ignore
            config.webPreferences[p2] = features.webPreferences[p2];
          }
        } else {
          // @ts-ignore
          config[p] = features[p];
        }
      }
      // 如果配置项中modal属性的值为true的话，说明渲染进程希望子窗口为一个模态窗口，这时我们要为子窗口提供父窗口配置项：parent，这个配置项的值就是当前窗口。
      //@ts-ignore
      if (config["modal"] === true) config.parent = win;
      // 允许打开窗口，并传递窗口配置对象
      // action: "allow"代表允许窗口打开，如果你想阻止窗口打开，那么只要返回{action: "deny"}即可。
      // 返回对象的 overrideBrowserWindowOptions 属性的值是被打开的新窗口的配置对象。
      return { action: "allow", overrideBrowserWindowOptions: config };
    });
  }
}
