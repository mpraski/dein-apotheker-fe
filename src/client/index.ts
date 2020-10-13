import { join } from '@fireflysemantics/join'
import { Token } from '@/store/types'
import { Request, Response } from './types'

export async function http<T>(
  url: string,
  additional?: RequestInit
): Promise<T> {
  const response = await fetch(url, additional)

  let r: Response<T>
  try {
    r = await response.json() as Response<T>
  } catch (ex) {
    /* eslint-disable no-throw-literal */
    throw 'failed to decode response: ' + ex.toString()
  }

  if (r.error) {
    throw r.error
  }

  if (r.content) {
    return r.content
  }

  /* eslint-disable no-throw-literal */
  throw 'didn\'t expect to reach this'
}

export class Client {
  public token?: Token

  /* eslint-disable no-useless-constructor */
  constructor(private baseURL: string) { }

  public async do<T = any, R = any>(
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

  private static withHeaders(init?: HeadersInit): Headers {
    const headers = new Headers(init)

    headers.append('Accept', 'application/json')
    headers.append('Content-Type', 'application/json')

    return headers
  }
}
