import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PoetryContentModule } from './poetry_content/poetry_content.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [PoetryContentModule,
    TypeOrmModule.forRoot({
      type: 'mysql', // 数据库类型
      host: '127.0.0.1', // 数据库的连接地址 host 127.0.0.1  8.141.3.144
      port: 3306, // 数据库的端口 3306
      username: 'root',
      password: 'Daisy12138',
      database: 'poetry', // 连接的数据库
      retryDelay: 500, // 重试连接数据库间隔
      retryAttempts: 10, // 允许重连次数
      synchronize: false, // 是否将实体同步到数据库
      autoLoadEntities: false, // 自动加载实体配置，forFeature()注册的每个实体都自己动加载,
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // 实体配置
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
