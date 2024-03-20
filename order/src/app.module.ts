import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
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
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env'], isGlobal: true, load: config }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        let obj: TypeOrmModuleOptions = {
          type: 'mariadb',
          host: configService.get('mariadb.host'),
          port: configService.get('mariadb.port'),
          database: configService.get('mariadb.database'),
          username: configService.get('mariadb.username'),
          password: configService.get('mariadb.password'),
          autoLoadEntities: true,
          synchronize: true,
        };

        return obj;
      },
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
