import { Client } from './client'
import { AnswerResponse } from './types'
import { Answer } from '@/store/answer/types'

export class Gateway {
  constructor (private client: Client) { }

  public async sendAnswer (answer: Answer): Promise<AnswerResponse> {
    return this.client.do('/answer', {
      method: 'POST',
      body: answer
    })
  }
}
