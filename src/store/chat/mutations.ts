import { MutationTree } from 'vuex'
import { Answer, Message, ChatState, emptyState, Mutations, Cart } from './types'
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
  [Mutations.addMessage](state, message: Message) {
    state.message = message
  },
  [Mutations.addState](state, stateID: string) {
    state.states.push(stateID)
  },
  [Mutations.revertMessage](state, message: Message) {
    state.message = message
  },
  [Mutations.revert](state, [_, prevState]: [number, string]) {
    const idx = state.states.findIndex((s) => s === prevState)

    if (idx === -1) {
      return
    }

    const states = state.states.slice(0, idx)

    Object.assign(state, emptyState(states))
  },
  [Mutations.clear](state) {
    Object.assign(state, emptyState())
  }
}
