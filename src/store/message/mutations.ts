import { MutationTree } from 'vuex'
import { MessageState, Message, Mutations, MessageData } from './types'
import { ValueOf } from '@/store/types'

type MutationDefinition = {
  [K in Mutations]: ValueOf<MutationTree<MessageState>>;
}

export const mutations: MutationDefinition = {
  [Mutations.addMessage](messages, message: [Message, MessageData]) {
    messages.push(message)
  },
  [Mutations.revert](state, index: number) {
    state.splice(index, state.length - index)
  },
  [Mutations.clear](messages) {
    messages.splice(0, messages.length)
  }
}
