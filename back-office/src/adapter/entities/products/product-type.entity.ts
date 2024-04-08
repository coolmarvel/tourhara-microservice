import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { ProductTypeEnum } from 'src/adapter/constants/product-type.enum';

export class ProductType {
  @PrimaryGeneratedColumn('uuid', { name: 'product_type_id' })
  productTypeId: string;

  @Column('enum', { name: 'product_type' })
  productType: ProductTypeEnum;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
