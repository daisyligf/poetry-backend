import {
    Controller,
    Get,
    Post,
    Request,
    Query,
    Body,
    Param,
    Headers,
  } from '@nestjs/common';
  import { PoetryContentService } from './poetry_content.service';

@Controller('/api/poetry')
export class PoetryContentController {
    constructor(private readonly poetryContentService: PoetryContentService) {}

    @Get('/quiz')
    async getQuiz() {
        return {
            code: 200,
            data: await this.poetryContentService.generateQuiz(),
            msg: 'success',
          };
    }



}
