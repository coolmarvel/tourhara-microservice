import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';
import { TagModule } from './tag/tag.module';
import { AttributeModule } from './attribute/attribute.module';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env'], isGlobal: true, load: config }),
    TypeOrmModule.forRootAsync({
      name: 'staging',
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        let obj: TypeOrmModuleOptions = {
          type: 'mariadb',
          host: configService.get('mariadb-stag.host'),
          port: configService.get('mariadb-stag.port'),
          database: configService.get('mariadb-stag.database'),
          username: configService.get('mariadb-stag.username'),
          password: configService.get('mariadb-stag.password'),
          autoLoadEntities: true,
          synchronize: true,
        };

        return obj;
      },
    }),
    TypeOrmModule.forRootAsync({
      name: 'production',
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        let obj: TypeOrmModuleOptions = {
          type: 'mariadb',
          host: configService.get('mariadb-prod.host'),
          port: configService.get('mariadb-prod.port'),
          database: configService.get('mariadb-prod.database'),
          username: configService.get('mariadb-prod.username'),
          password: configService.get('mariadb-prod.password'),
          autoLoadEntities: true,
          synchronize: true,
        };

        return obj;
      },
    }),
    ProductModule,
    CategoryModule,
    TagModule,
    AttributeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
