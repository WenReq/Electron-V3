/*
 * @Author: wenreq 294491328@qq.com
 * @Date: 2023-07-03 14:16:31
 * @LastEditors: wenreq 294491328@qq.com
 * @LastEditTime: 2023-07-03 14:20:46
 * @FilePath: /electron-jue-jin-dev/src/model/ModelBase.ts
 * @Description: common model。这里我们暂时只提供了一个公共字段：id，凡继承于ModelBase的子类都将拥有这个字段，而且这个字段是随模型实例化的时候自动创建的。也就是说，只有new ModelXXXX时才会创建这个字段，let model = obj as ModelXXXX时不会创建这个字段。
 */
import crypto from "crypto";
export class ModelBase {
  id: string;
  constructor() {
    // 我们使用 Node.js crypto模块的randomUUID方法来生成每个聊天会话的 ID，这将为我们把数据存储在数据库中打下基础。
    this.id = crypto.randomUUID();
  }
}
