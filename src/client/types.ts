export interface Response<T> {
    error?: string;
    content?: T;
}

export interface Request<T> {
    method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
    headers?: HeadersInit;
    body?: T;
}
