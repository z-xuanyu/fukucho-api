/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-12-28 14:45:35
 * @LastEditTime: 2022-02-12 16:43:44
 * @Description: 产品模型
 */
import { ProductSkuSelectType } from '@app/common/enum/product.enum';
import { ApiProperty } from '@nestjs/swagger';
import { ModelOptions, prop, Ref } from '@typegoose/typegoose';
import { Category } from './category.model';
import { Tag } from './tag.model';
// 添加创建时间、更新时间字段
@ModelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
class SkuType {
  @ApiProperty({ title: '规格名称' })
  skuName: string;

  @ApiProperty({ title: '规格值集合' })
  skuValues: SkuDataType[];
}

class SkuDataType {
  @ApiProperty({ title: '规格值' })
  value: string;

  @ApiProperty({ title: '规格值', default: 0 })
  price: number;

  @ApiProperty({ title: '库存', default: 0 })
  inventory: number;

  @ApiProperty({ title: '成本价' })
  costPrice: number;

  @ApiProperty({ title: '重量' })
  weight: number;

  @ApiProperty({ title: '规格图片' })
  image: number;

  @ApiProperty({ title: '货号' })
  artNo: number;
}
export class Product {
  @ApiProperty({ title: '产品名称' })
  @prop({ required: true })
  title: string;

  @ApiProperty({ title: '产品图片' })
  @prop({ required: true })
  pic: string;

  @ApiProperty({ title: '产品轮播图' })
  @prop({ type: [String] })
  bannerImg: string[];

  @ApiProperty({ title: '产品描述' })
  @prop({ required: true })
  description: string;

  @ApiProperty({ title: '产品分类' })
  @prop({ ref: () => Category })
  category: Ref<Category>;

  @ApiProperty({ title: '产品标签' })
  @prop({ type: [Tag], ref: () => Tag })
  tags?: Ref<Tag>[];

  @ApiProperty({ title: '产品价格' })
  @prop({ default: 0, required: true })
  price: number;

  @ApiProperty({ title: '产品库存' })
  @prop({ default: 0, required: true })
  inventory: number;

  @ApiProperty({ title: '产品销量' })
  @prop({ default: 0, required: true })
  sales: number;

  @ApiProperty({ title: '产品浏览量' })
  @prop({ default: 0, required: true })
  views: number;

  @ApiProperty({ title: '规格类型' })
  @prop({
    default: ProductSkuSelectType.SINGLE,
    type: Number,
    enum: ProductSkuSelectType,
  })
  skuType: ProductSkuSelectType;

  @ApiProperty({ title: '产品规格' })
  @prop({ type: SkuType })
  sku: SkuType[];

  @ApiProperty({ title: '产品排序', description: '整数数字类型' })
  @prop({ default: 1 })
  sort: number;

  @ApiProperty({ title: '分类状态', example: true })
  @prop({ default: true })
  status: boolean;
}
