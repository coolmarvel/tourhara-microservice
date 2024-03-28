import { Module } from '@nestjs/common';
import { OrderModule } from 'src/woocommerce/order/order.module';
import { ProductModule } from 'src/woocommerce/product/product.module';

@Module({
  imports: [OrderModule, ProductModule],
})
export class WoocommerceModule {}
