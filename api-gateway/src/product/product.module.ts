import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  providers: [
    ProductService,
    {
      provide: 'PRODUCT_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: { host: process.env.PRODUCT_DOCKER_FLAG === 'true' ? process.env.PRODUCT_DOCKER_HOST : 'localhost', port: Number(process.env.PRODUCT_DOCKER_PORT) },
        });
      },
    },
  ],
  controllers: [ProductController],
})
export class ProductModule {}
