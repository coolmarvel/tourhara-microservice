import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { OrderModule } from './order/order.module';

import config from './config';
import { LoggerMiddleware } from './common';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: [`.env.${process.env.NODE_ENV}`], isGlobal: true, load: config }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mariadb',
        host: configService.get('mariadb.host'),
        port: configService.get('mariadb.port'),
        database: configService.get('mariadb.database'),
        username: configService.get('mariadb.username'),
        password: configService.get('mariadb.password'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
