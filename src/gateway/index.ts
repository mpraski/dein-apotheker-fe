import { Client } from '@/client'
import { Code } from '@/client/code'
import { ChatService, AnswerRequest, AnswerResponse, SessionService, NewSessionResponse } from './types'

export class ChatClient implements ChatService {
  private client: Client;

  constructor(client: Client) {
    this.client = client
  }

  public async answer(req: AnswerRequest): Promise<AnswerResponse> {
    return this.client.do('/chat/answer', {
      method: 'POST',
      body: req
    })
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
    return this.client.code('/session', {
      method: 'GET'
    }).then((code) => code === Code.OK)
  }

  public async delete(): Promise<boolean> {
    return this.client.code('/session', {
      method: 'DELETE'
    }).then((code) => code === Code.NO_CONTENT)
  }
}
