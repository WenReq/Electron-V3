/*
 * @Author: wenreq 294491328@qq.com
 * @Date: 2023-07-03 11:07:06
 * @LastEditors: wenreq 294491328@qq.com
 * @LastEditTime: 2023-07-03 11:10:34
 * @FilePath: /electron-jue-jin-dev/src/renderer/Common/Dialog.ts
 * @Description: 封装子窗口加载成功的事件（我们要自己封装一个事件，在我们的业务代码真正执行完成时，手动发射这个事件，告知主窗口：“现在子窗口已经加载成功啦，你可以给我发送消息了！”）
 */
// 我们把 window.open 的逻辑封装到一个 Promise 对象中， 通过 window.open 打开子窗口后，当前窗口马上监听 message 事件，子窗口有消息发送给当前窗口时，这个事件将被触发。
export let createDialog = (url: string, config: any): Promise<Window> => {
  return new Promise((resolve, reject) => {
    let windowProxy = window.open(url, "_blank", JSON.stringify(config)) as Window;
    let readyHandler = (e: any) => {
      // e.data 里存放着具体的消息内容，我们把它格式化成一个 JSON 对象。
      let msg = e.data;
      // 如果这个 JSON 对象的msgName属性为__dialogReady字符串，我们就成功resolve。
      if (msg["msgName"] === `__dialogReady`) {
        // Promise对象成功 resolve 之前要移除掉 message 事件的监听函数，避免内存泄漏（如果不这么做，用户每打开一个子窗口，就会注册一次 message 事件）。
        window.removeEventListener("message", readyHandler);
        resolve(windowProxy);
      }
    };
    window.addEventListener("message", readyHandler);
  });
};

// 这个方法是为子窗口服务的，当子窗口完成了必要的业务逻辑之后，就可以执行这个方法，通知父窗口自己已经加载成功。
export let dialogReady = () => {
  // 这个方法通过 window.opener 对象的 postMessage 方法向父窗口发送了一个消息，这个消息的内容是一个 JSON 对象，这个 JSON 对象的 msgName 属性为 __dialogReady 字符串。

  // 父窗口收到子窗口发来的这个消息后，将触发message事件，也就会执行我们在createDialog方法中撰写的逻辑了。
  let msg = { msgName: `__dialogReady` };
  window.opener.postMessage(msg);
};
