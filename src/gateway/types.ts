import { Answer, Message, Cart } from '@/store/chat/types'

export type Call<R, S> = (r: R) => Promise<S>

export type Cast<S> = () => Promise<S>

export interface ChatService {
  answer: Call<AnswerRequest, AnswerResponse>;
}

export interface SessionService {
  new: Cast<NewSessionResponse>;
  has: Cast<boolean>;
}

export type AnswerRequest = Answer;

export interface AnswerResponse {
  id: string;
  message: Message;
  cart: Cart;
}

export interface NewSessionResponse {
  csrf_token: string;
}
