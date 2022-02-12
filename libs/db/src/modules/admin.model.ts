/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-12-24 15:55:35
 * @LastEditTime: 2022-02-12 16:08:37
 * @Description: Modify here please
 */
import { Role } from '@app/common/enum/role';
import { ApiProperty } from '@nestjs/swagger';
import { prop, ModelOptions, DocumentType } from '@typegoose/typegoose';

import { hashSync } from 'bcryptjs';
export type AdminDocument = DocumentType<Admin>;
// 添加创建时间、更新时间字段
@ModelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Admin {
  @ApiProperty({ title: '名称' })
  @prop({ required: true })
  name: string;

  @ApiProperty({ title: '邮箱' })
  @prop({ required: true, unique: true })
  email: string;

  @ApiProperty({ title: '密码' })
  @prop({
    required: true,
    select: false,
    get(val) {
      return val;
    },
    set(val) {
      return val ? hashSync(val) : val;
    },
  })
  password: string;

  @ApiProperty({ title: '角色' })
  @prop({ default: Role.TEST, type: String, enum: Role })
  roles: Array<Role>;

  @ApiProperty({ title: '状态' })
  @prop({ default: true })
  status: boolean;
}
