import { PoetryMeta } from "../entities/poetry_meta.entity";


export class PoetryQuiz {
    poetryMeta: PoetryMeta;
    question: string;
    line: string;
    answer: string;
    answerNext: boolean;
    options: string[];
    createTime: Date;
    updateTime: Date;
}