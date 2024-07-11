import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ProductModule } from './product/product.module';
import { LoggerMiddleware } from './common';
import config from './config';

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
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
