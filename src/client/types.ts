export interface Response<T> {
    error: string | null;
    data: T | null;
}

export interface Request<T> {
    method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
    headers?: HeadersInit;
    params?: Record<string, any>;
    body?: T;
}
