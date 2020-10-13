import { HTTPError } from './error'
import { Request, Response } from './types'

export async function http<T>(
  url: string,
  additional?: RequestInit
): Promise<T> {
  const response = await fetch(url, additional)
  const decoded = await response.json() as Response<T>

  if (!response.ok) {
    throw new HTTPError(response.status)
  }

  if (decoded.error) {
    throw decoded.error
  }

  if (decoded.data) {
    return decoded.data
  }

  throw new Error('didn\'t expect to reach this')
}

export async function code(
  url: string,
  additional?: RequestInit
): Promise<number> {
  const response = await fetch(url, additional)

  if (!response.ok) {
    throw new HTTPError(response.status)
  }

  return response.status
}

export class Client {
  private token?: string;
  private baseURL: string;

  private readonly tokenName = 'x-csrf-token'

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  public setToken(token: string) {
    this.token = token
  }

  public async do<T = any, R = any>(
    path: string,
    request: Request<R>
  ): Promise<T> {
    const url = this.join(this.baseURL, path)
    const body = request.body
    const method = request.method
    const headers = this.withHeaders(request.headers)
    const token = this.token

    if (token) {
      headers.append(this.tokenName, token)
    }

    return http<T>(url, {
      method: method,
      headers: headers,
      body: JSON.stringify(body)
    })
  }

  public async code<R = any>(
    path: string,
    request: Request<R>
  ): Promise<number> {
    const url = this.join(this.baseURL, path)
    const body = request.body
    const method = request.method
    const headers = this.withHeaders(request.headers)
    const token = this.token

    if (token) {
      headers.append(this.tokenName, token)
    }

    return code(url, {
      method: method,
      headers: headers,
      body: JSON.stringify(body)
    })
  }

  private withHeaders(init?: HeadersInit): Headers {
    const headers = new Headers(init)

    headers.append('Accept', 'application/json')
    headers.append('Content-Type', 'application/json')

    return headers
  }

  private join(...args: string[]): string {
    return args.map((part, i) => {
      if (i === 0) {
        return part.trim().replace(/[/]*$/g, '')
      } else {
        return part.trim().replace(/(^[/]*|[/]*$)/g, '')
      }
    }).filter((x) => x.length).join('/')
  }
}
