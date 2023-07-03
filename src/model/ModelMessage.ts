/*
 * @Author: wenreq 294491328@qq.com
 * @Date: 2023-07-03 14:35:31
 * @LastEditors: wenreq 294491328@qq.com
 * @LastEditTime: 2023-07-03 14:35:38
 * @FilePath: /electron-jue-jin-dev/src/model/ModelMessage.ts
 * @Description: 用于描述聊天的消息，聊天会话模型与这个模型之间的关系是一对多的关系（1:n）
 */
import { ModelBase } from "./ModelBase";
export class ModelMessage extends ModelBase {
  createTime?: number;
  receiveTime?: number;
  messageContent?: string;
  chatId?: string;
  fromName?: string;
  avatar?: string;
  //** 是否为传入消息 */
  isInMsg?: boolean;
}
