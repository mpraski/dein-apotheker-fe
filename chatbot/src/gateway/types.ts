import { Input } from '@/store/input/types'
import { Message } from '@/store/message/types'

export interface Response<T> {
    error?: string;
    content?: T;
}

export interface Request<T> {
    method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
    headers?: HeadersInit;
    body?: T;
}

export type Token = string

export interface TokenInfo {
    tokenURL: string;
    tokenStorage: () => Optional<Token>;
}

export type Optional<T> = T | undefined

// API SPECIFIC
export interface AnswerResponse {
    messages: ReadonlyArray<Message>;
    input: Input;
}