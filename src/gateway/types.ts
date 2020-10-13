import { Chat } from '@/store/chat/types'

export type Call<R, S> = (r: R) => Promise<S>

export type Cast<S> = () => Promise<S>

export interface ChatService {
  answer: Call<AnswerRequest, AnswerResponse>;
}

export interface SessionService {
  new: Cast<NewSessionResponse>;
  has: Cast<boolean>;
  delete: Cast<boolean>;
}

export interface AnswerRequest {
  state: string;
  value: string | ReadonlyArray<string> | null;
}

export type AnswerResponse = Chat

export interface NewSessionResponse {
  csrf_token: string;
}
