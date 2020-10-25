import { HTTPError, APIError } from './errors'
import { Request, Response } from './types'

type httpClient<T> = (y: string, i?: RequestInit) => Promise<T>

async function http<T>(url: string, additional?: RequestInit): Promise<T> {
  const response = await fetch(url, additional)
  const decoded = await response.json() as Response<T>

  if (!response.ok) {
    throw new HTTPError(response.status)
  }

  if (decoded.error) {
    throw new APIError(decoded.error)
  }

  if (decoded.data) {
    return decoded.data
  }

  throw new Error('didn\'t expect to reach this')
}

async function code(url: string, additional?: RequestInit): Promise<number> {
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

  public async do<T, R>(
    path: string,
    request: Request<R>
  ): Promise<T> {
    return this.execute(path, request, http as httpClient<T>)
  }

  public async code<R>(
    path: string,
    request: Request<R>
  ): Promise<number> {
    return this.execute(path, request, code)
  }

  private async execute<T = any, R = any>(
    path: string,
    request: Request<R>,
    func: httpClient<T>
  ): Promise<T> {
    const body = request.body
    const method = request.method
    const params = request.params
    const headers = this.withHeaders(request.headers)
    const token = this.token

    if (token) {
      headers.append(this.tokenName, token)
    }

    const url = this.buildURL(this.join(this.baseURL, path), params)

    return func(url, {
      method: method,
      headers: headers,
      credentials: 'include',
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

  private buildURL(base: string, params?: Record<string, any>): string {
    if (!params) {
      return base
    }

    return base + '?' + new URLSearchParams(params)
  }
}
