/*
 * @Author: wenreq 294491328@qq.com
 * @Date: 2023-07-03 14:13:17
 * @LastEditors: wenreq 294491328@qq.com
 * @LastEditTime: 2023-07-03 14:21:44
 * @FilePath: /electron-jue-jin-dev/src/model/ModelChat.ts
 * @Description: ModelChat模型的代码。模型主要用于描述对象携带的信息，所以模型里的类并没有具体的方法。
 */
import { ModelBase } from "./ModelBase";
export class ModelChat extends ModelBase {
  fromName?: string;
  sendTime?: number | string;
  isSelected = false;
  lastMsg?: string;
  avatar?: string;
  /**
   * 0单聊，1群聊，2公众号，3文件传输助手
   */
  chatType?: number;
}
