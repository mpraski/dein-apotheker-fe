import { Client } from '@/client'
import { Code } from '@/client/code'
import { ChatService, AnswerRequest, AnswerResponse, SessionService, NewSessionResponse, RevertRequest } from './types'

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

  public async revert(req: RevertRequest): Promise<AnswerResponse> {
    return this.client.do('/chat/revert', {
      method: 'PATCH',
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
}
