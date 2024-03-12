import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Int32, Repository } from 'typeorm';
import { PoetryContent } from './entities/poetry_content.entity';
import { PoetryMeta } from './entities/poetry_meta.entity';
import { PoetryQuiz } from './models/poetry_quiz.model';

@Injectable()
export class PoetryContentService {

    constructor(
        @InjectRepository(PoetryContent) private readonly poetryContent: Repository<PoetryContent>,
        @InjectRepository(PoetryMeta) private readonly poetryMeta: Repository<PoetryMeta>,
    ) {}

    async findAll(): Promise<PoetryContent[]> {
        return await this.poetryContent.find();
    }

    // 执行这条sql语句 SELECT id FROM poetry_meta ORDER BY RAND() LIMIT 1; 
    async findOneRandom(): Promise<PoetryMeta> {
        const poetryMeta = await this.poetryMeta.query(`SELECT * FROM poetry_meta ORDER BY RAND() LIMIT 1`);
        return poetryMeta[0];
    }

    async getPoetryContents(poetryMeta: PoetryMeta): Promise<PoetryContent[]> {

        // 根据元信息查询诗的内容，并把诗的内容保存到poetryContents数组中
        const poetryContents = await this.poetryContent.find({
            where: {
                poetryMetaId: poetryMeta.id
            },
            order: {
                seq: 'ASC'
            }
        });


        // 返回poetryContents数组
        return poetryContents;
    }

    async findRandomPoetryContent(size: number): Promise<PoetryContent[]> {
        const poetryContents = await this.poetryContent.query(`SELECT * FROM poetry_content ORDER BY RAND() LIMIT ${size}`);
        return poetryContents;
    }


    async generateQuiz(): Promise<PoetryQuiz> {

        // 随机查询一首诗的元信息
        const poetryMeta = await this.findOneRandom();
        console.log('poetryMeta: ', poetryMeta);
        const poetryContents = this.getPoetryContents(poetryMeta);
        console.log('poetryContents: ', poetryContents);
        const poetryQuiz = new PoetryQuiz();
        poetryQuiz.poetryMeta = poetryMeta;

        // 从poetryContents中随机取两条连续的诗句作为问题
        const index = Math.floor(Math.random() * ((await poetryContents).length - 1));
        console.log('index: ', index, 'length: ', (await poetryContents).length);
        const content = (await poetryContents)[index];
        const first = content.content;
        const next = (await poetryContents)[index + 1].content;

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
