import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AdapterModule } from './adapter/adapter.module';
import { BillingModule } from './billing/billing.module';
import { ShippingModule } from './shipping/shipping.module';
import { LineItemModule } from './line-item/line-item.module';
import { PaymentModule } from './payment/payment.module';
import { TourModule } from './tour/tour.module';
import { GuestHouseModule } from './guest-house/guest-house.module';
import { UsimModule } from './usim/usim.module';
import { JfkModule } from './jfk/jfk.module';
import { CouponLineModule } from './coupon-line/coupon-line.module';
import { CheckListModule } from './check-list/check-list.module';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env'], isGlobal: true, load: config }),
    TypeOrmModule.forRootAsync({
      name: 'staging',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ({
          type: 'mariadb',
          name: 'staging',
          host: configService.get('mariadb-stag.host'),
          port: configService.get('mariadb-stag.port'),
          database: configService.get('mariadb-stag.database'),
          username: configService.get('mariadb-stag.username'),
          password: configService.get('mariadb-stag.password'),
          autoLoadEntities: true,
          synchronize: true,
        }) as TypeOrmModuleAsyncOptions,
    }),
    TypeOrmModule.forRootAsync({
      name: 'production',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ({
          type: 'mariadb',
          name: 'production',
          host: configService.get('mariadb-prod.host'),
          port: configService.get('mariadb-prod.port'),
          database: configService.get('mariadb-prod.database'),
          username: configService.get('mariadb-prod.username'),
          password: configService.get('mariadb-prod.password'),
          autoLoadEntities: true,
          synchronize: true,
        }) as TypeOrmModuleAsyncOptions,
    }),
    OrderModule,
    AdapterModule,
    BillingModule,
    ShippingModule,
    LineItemModule,
    PaymentModule,
    TourModule,
    GuestHouseModule,
    UsimModule,
    JfkModule,
    CouponLineModule,
    CheckListModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
