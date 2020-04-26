import { join } from '@fireflysemantics/join'
import { Token } from '@/store/types'
import { Request, Response, Optional } from './types'

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
  public token: Optional<Token>

  constructor (
    private baseURL: string
  ) {
    this.token = undefined
  }

  public async do<T = any, R = any> (
    path: string,
    request: Request<R>
  ): Promise<T> {
    const url = join(this.baseURL, path)
    const body = request.body
    const method = request.method
    const headers = Client.withHeaders(request.headers)
    const token = this.token

    if (token) {
      headers.append('Token', token)
    }

    return http<T>(url, {
      method: method,
      headers: headers,
      body: JSON.stringify(body)
    })
  }

  private static withHeaders (init?: HeadersInit): Headers {
    const headers = new Headers(init)

    headers.append('Accept', 'application/json')
    headers.append('Content-Type', 'application/json')
    headers.append('Origin', 'localhost')

    return headers
  }
}
