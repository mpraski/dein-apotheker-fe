import { join } from '@fireflysemantics/join'
import { Request, Response, Token, TokenInfo, Optional } from './types'

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
  constructor (
        private baseURL: string,
        private tokenInfo: TokenInfo
  ) { }

    private token: Optional<Token> = undefined;

    public async do<T = any, R = any> (
      path: string,
      request: Request<R>
    ): Promise<T> {
      const url = join(this.baseURL, path)
      const method = request.method
      const headers = Client.withHeaders(request.headers)
      const token = await this.getToken()

      headers.append('Token', token)

      return http<T>(url, {
        method: method,
        headers: headers,
        body: JSON.stringify(headers)
      })
    }

    private async getToken (): Promise<Token> {
      if (this.token) {
        return this.token
      }

      this.token = this.tokenInfo.tokenStorage()
      if (this.token) {
        return this.token
      }

      try {
        this.token = await http<Token>(this.tokenInfo.tokenURL, { method: 'GET' })
      } catch (e) {
        throw Error('failed to fetch token: ' + (e as Error).message)
      }

      return this.token
    }

    private static withHeaders (init?: HeadersInit): Headers {
      const headers = new Headers(init)

      headers.append('Accept', 'application/json')
      headers.append('Content-Type', 'application/json')

      return headers
    }
}
