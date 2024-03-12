import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Int32, Repository } from 'typeorm';
import { PoetryLine } from './entities/poetry_line.entity';
import { PoetryMeta } from './entities/poetry_meta.entity';
import { PoetryQuiz } from './models/poetry_quiz.model';

@Injectable()
export class PoetryContentService {

    constructor(
        @InjectRepository(PoetryLine) 
        private poetryLineRepository: Repository<PoetryLine>,
        @InjectRepository(PoetryMeta) 
        private poetryMetaRepository: Repository<PoetryMeta>,
    ) {}

    findAll(): Promise<PoetryLine[]> {
        return this.poetryLineRepository.find();
    }

    // 执行这条sql语句 SELECT id FROM poetry_meta ORDER BY RAND() LIMIT 1; 
    async findOneRandom(): Promise<PoetryMeta> {
        try {
            const poetryMeta = this.poetryMetaRepository.query(`SELECT * FROM poetry_meta ORDER BY RAND() LIMIT 1`);
            console.log('poetryMeta: ', poetryMeta);
            return poetryMeta;
        } catch (error) {
            console.log('error: ', error);
            throw error;
        }
    }

    async getPoetryLines(poetryMeta: PoetryMeta): Promise<PoetryLine[]> {
        console.log('poetryMeta1111: ', poetryMeta);
        console.log('poetryMeta.id: ', poetryMeta.id);

        try {
            const poetryLines = this.poetryLineRepository.find({
                where: {
                    poetryMetaId: poetryMeta.id
                },
                order: {
                    seq: 'ASC'
                }
            });
            // console.log('poetryLines11111: ', await poetryLines);
            return poetryLines;
        } catch (error) {
            console.log('error: ', error);
            throw error;
        }
    }

    async findRandomPoetryContent(size: number): Promise<PoetryLine[]> {
        const poetryContents = this.poetryLineRepository.query(`SELECT * FROM poetry_line ORDER BY RAND() LIMIT ${size}`);
        return poetryContents;
    }


    async generateQuiz(): Promise<PoetryQuiz> {

        // 随机查询一首诗的元信息
        const poetryMetas = await this.findOneRandom();
        console.log('poetryMeta: ', poetryMetas);
        const poetryLines = await this.getPoetryLines(poetryMetas[0]);
        // console.log('poetryLines: ', poetryLines);
        const poetryQuiz = new PoetryQuiz();
        poetryQuiz.poetryMeta = poetryMetas[0];

        // 从poetryContents中随机取两条连续的诗句作为问题
        const index = Math.floor(Math.random() * ((await poetryLines).length - 1));
        console.log('index: ', index, 'length: ', (await poetryLines).length);
        const content = (await poetryLines)[index];
        const first = content.content;
        const next = (await poetryLines)[index + 1].content;

        // 随机将两条诗句中的一个作为问题，也就是line，并且设置answerNext为true/false（如果line是前一句，则answerNext为true，否则为false）
        if (Math.random() > 0.5) {
            poetryQuiz.line = first;
            poetryQuiz.answer = next;
            poetryQuiz.answerNext = true;
        } else {
            poetryQuiz.line = next;
            poetryQuiz.answer = first;
            poetryQuiz.answerNext = false;
        }

        // 设置问题的选项， 从PoetryContent表中中随机取三条诗句作为选项
        const options = [];
        const randomContents = await this.findRandomPoetryContent(3);
        // 将randomContents和answer字段随机打碎，然后放到options数组中
        randomContents.forEach(content => options.push(content.content));
        options.push(poetryQuiz.answer);

        // 将options数组中的元素随机打乱
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }

        poetryQuiz.options = options;

        return poetryQuiz;
    

    }

}
