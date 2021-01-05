import { MutationTree } from 'vuex'
import { Answer, Message, ChatState, emptyState, Mutations, Cart, Question } from './types'
import { ValueOf } from '@/store/types'

type MutationDefinition = {
  [K in Mutations]: ValueOf<MutationTree<ChatState>>;
}

export const mutations: MutationDefinition = {
  [Mutations.showInput](state) {
    state.showInput = true
  },
  [Mutations.hideInput](state) {
    state.showInput = false
  },
  [Mutations.addCart](state, cart: Cart) {
    state.cart = cart
  },
  [Mutations.addAnswer](state, answer: Answer) {
    state.answer = answer
  },
  [Mutations.addQuestion](state, question: Question) {
    state.questions.push(question)
  },
  [Mutations.addMessage](state, message: Message) {
    state.message = message
  },
  [Mutations.addState](state, stateID: string) {
    state.states.push(stateID)
  },
  [Mutations.clear](state) {
    Object.assign(state, emptyState())
  }
}
