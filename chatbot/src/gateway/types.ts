import { Context, Answer, Question } from '@/store/answer/types'

export type Call<A, R> = (c: Context, a: A) => Promise<Contextual<R>>

export interface API {
    answer: Call<AnswerRequest, AnswerResponse>;
}

export interface Contextual<T> {
    context: Context;
    data: T;
}

export type AnswerRequest = Answer;

export type AnswerResponse = Question;
