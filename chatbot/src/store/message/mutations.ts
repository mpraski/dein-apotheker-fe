import { MutationTree } from 'vuex'
import { MessageState, Message, Mutations } from './types'
import { ValueOf } from '@/store/types'

type MutationDefinition = {
    [K in Mutations]: ValueOf<MutationTree<MessageState>>;
}

export const mutations: MutationDefinition = {
  [Mutations.receiveMessage] (messages, message: Message) {
    messages.push(message)
  }
}
