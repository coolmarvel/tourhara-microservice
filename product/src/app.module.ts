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
    ProductModule,
    CategoryModule,
    TagModule,
    AttributeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
