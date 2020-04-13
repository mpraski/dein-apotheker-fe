import { MutationTree } from 'vuex'
import { MessageState, Message, Mutations, Alignment } from './types'
import { ValueOf } from '@/store/types'

type MutationDefinition = {
    [K in Mutations]: ValueOf<MutationTree<MessageState>>;
}

export const mutations: MutationDefinition = {
  [Mutations.receiveMessage] (messages, message: [Message, Alignment, string]) {
    messages.push(message)
  },

  [Mutations.rewind] (messages, amount: number) {
    for (let i = 0; i < amount; i++) {
      messages.pop()
    }
  }
}
