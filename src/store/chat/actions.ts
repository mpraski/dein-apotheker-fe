import { ActionTree } from 'vuex'
import { Message, Answer, Cart, ChatState, Actions, Mutations } from './types'
import { RootState, ValueOf } from '@/store/types'

type ActionDefinition = {
  [K in Actions]: ValueOf<ActionTree<ChatState, RootState>>;
}

export const actions: ActionDefinition = {
  [Actions.showInput]({ commit }) {
    commit(Mutations.showInput)
  },
  [Actions.hideInput]({ commit }) {
    commit(Mutations.hideInput)
  },
  [Actions.addAnswer]({ commit }, answer: Answer) {
    commit(Mutations.addAnswer, answer)
  },
  [Actions.addResponse]({ commit }, payload: [string, Message, Cart]) {
    commit(Mutations.addState, payload[0])
    commit(Mutations.addMessage, payload[1])
    commit(Mutations.addCart, payload[2])
  },
  [Actions.clear]({ commit }) {
    commit(Mutations.clear)
  }
}
