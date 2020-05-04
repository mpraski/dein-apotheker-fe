import { Client } from '@/client'
import { extractAnswer, Context, Answer } from '@/store/answer/types'
import { API, Contextual, AnswerResponse, withContext } from './types'
import { Token } from '@/store/types'

export class Gateway implements API {
  /* eslint-disable no-useless-constructor */
  constructor (private client: Client) { }

  public async start (ctx: Context): Promise<Contextual<AnswerResponse>> {
    return this.client.do('/answer', {
      method: 'POST',
      body: withContext(ctx, {})
    })
  }

  public async answer (ctx: Context, answer: Answer): Promise<Contextual<AnswerResponse>> {
    return this.client.do('/answer', {
      method: 'POST',
      body: withContext(ctx, {
        type: answer.type,
        value: extractAnswer(answer)
      })
    })
  }

  public async token (): Promise<Token> {
    return this.client.do('/token', { method: 'POST' })
  }

  public setToken (token: Token) {
    this.client.token = token
  }
}
