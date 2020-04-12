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

export type Optional<T> = T | undefined

export interface TokenInfo {
    URL: string;
    get: () => Optional<Token>;
    store: (t: Optional<Token>) => void;
}
