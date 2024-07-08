import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { AdapterModule } from './adapter/adapter.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
    AdapterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
