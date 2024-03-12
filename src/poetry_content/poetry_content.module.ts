import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PoetryContentController } from './poetry_content.controller';
import { PoetryContentService } from './poetry_content.service';
import { PoetryLine } from './entities/poetry_line.entity';
import { PoetryMeta } from './entities/poetry_meta.entity'; // 确保你有这个导入

@Module({
  imports: [
    TypeOrmModule.forFeature([PoetryLine, PoetryMeta]), // 在这里添加PoetryMeta
  ],
  controllers: [PoetryContentController],
  providers: [PoetryContentService]
})
export class PoetryContentModule {}