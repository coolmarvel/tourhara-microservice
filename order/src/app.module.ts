import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { OrderModule } from './order/order.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
