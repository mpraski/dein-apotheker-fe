import { Client } from '@/client'
import { Code } from '@/client/code'
import { HTTPError } from '@/client/error'
import { ChatService, AnswerRequest, AnswerResponse, SessionService, NewSessionResponse } from './types'

export class ChatClient implements ChatService {
  private client: Client;

  constructor(client: Client) {
    this.client = client
  }

  public async answer(req: AnswerRequest): Promise<AnswerResponse> {
    return this.client.do('/answer', {
      method: 'POST',
      body: req
    })
  }
}

export class ChatInterceptor implements ChatService {
  private base: ChatService;
  private action: () => {};

  constructor(base: ChatService, action: () => {}) {
    this.base = base
    this.action = action
  }

  public async answer(req: AnswerRequest): Promise<AnswerResponse> {
    try {
      return this.base.answer(req)
    } catch (e) {
      if (e instanceof HTTPError) {
        if (e.code === Code.UNAUTHORIZED) {
          this.action()
        }
      }

      throw e
    }
  }
}

export class SessionClient implements SessionService {
  private client: Client;

  constructor(client: Client) {
    this.client = client
  }

  public async new(): Promise<NewSessionResponse> {
    return this.client.do('/session', {
      method: 'POST'
    })
  }

  public async has(): Promise<boolean> {
    try {
      const resp = await this.client.code('/session', {
        method: 'GET'
      })

      return resp === Code.OK
    } catch (e) {
      if (e instanceof HTTPError) {
        if (e.code === Code.UNAUTHORIZED) {
          return false
        }
      }

      throw e
    }
  }

  public async delete(): Promise<boolean> {
    const resp = await this.client.code('/session', {
      method: 'DELETE'
    })

    return resp === Code.NO_CONTENT
  }
}
