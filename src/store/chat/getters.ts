import { GetterTree } from 'vuex'
import { ChatState, Message, Getters, Cart } from './types'
import { RootState, ValueOf } from '@/store/types'

type GetterDefinition = {
  [K in Getters]: ValueOf<GetterTree<ChatState, RootState>>;
}

export const getters: GetterDefinition = {
  [Getters.input](state): boolean {
    return state.showInput
  },
  [Getters.state](state): string | undefined {
    if (state.states.length) {
      return state.states[state.states.length - 1]
    }

    return undefined
  },
  [Getters.message](state): Message | undefined {
    return state.message
  },
  [Getters.cart](state): Cart | undefined {
    return state.cart
  }
}
