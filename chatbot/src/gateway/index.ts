import { Client } from '@/client'
import { Answer } from '@/store/answer/types'
import { AnswerResponse } from './types'

export class Gateway {
  /* eslint-disable no-useless-constructor */
  constructor (private client: Client) { }

  public async sendAnswer (answer: Answer): Promise<AnswerResponse> {
    return this.client.do('/answer', {
      method: 'POST',
      body: answer
    })
  }
}
