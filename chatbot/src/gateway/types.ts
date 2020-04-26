import { Context, Question, AnswerType } from '@/store/answer/types'
import { Token } from '@/store/types'

export type Call<R> = (c: Context, ...a: any[]) => Promise<Contextual<R>>

export interface API {
    start: Call<AnswerResponse>;
    answer: Call<AnswerResponse>;
    token: () => Promise<Token>;
    setToken: (t: Token) => void;
}

export interface Contextual<T> {
    context: Context;
    data: T;
}

export interface AnswerRequest {
    type: AnswerType;
    value: string | ReadonlyArray<string>;
}

export type AnswerResponse = Question;

export const withContext = <T>(c: Context, t: T): Contextual<T> => {
  return {
    context: c,
    data: t
  }
}
