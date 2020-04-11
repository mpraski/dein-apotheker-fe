import { join } from '@fireflysemantics/join'

interface Response<T> {
    error?: string;
    content?: T;
}

interface Request<T> {
    method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
    headers?: HeadersInit;
    body?: T;
}

export async function http<T> (
  url: string,
  additional?: RequestInit
): Promise<T> {
  const response = await fetch(url, additional)
  if (!response.ok) {
    throw new Error(response.statusText)
  }

  const r = await response.json() as Response<T>
  if (r.error) {
    throw new Error(r.error)
  }

  if (r.content) {
    return r.content
  }

  throw new Error('didn\'t expect to reach this')
}

export class Client {
  constructor (private baseURL: string) { }

  public async do<T, R = any> (
    path: string,
    request: Request<R>
  ): Promise<T> {
    const url = join(this.baseURL, path)

    return http<T>(url, {
      method: request.method,
      headers: request.headers,
      body: JSON.stringify(request.body)
    })
  }
}
