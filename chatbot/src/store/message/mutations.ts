import { MutationTree } from 'vuex'
import { MessageState, Message, Mutations, Alignment } from './types'
import { ValueOf } from '@/store/types'

type MutationDefinition = {
    [K in Mutations]: ValueOf<MutationTree<MessageState>>;
}

export const mutations: MutationDefinition = {
  [Mutations.receiveMessage] (messages, message: [Message, Alignment]) {
    messages.push(message)
  },

  [Mutations.rewind] (messages, amount: number) {
    messages.splice(-amount)
  }
}
