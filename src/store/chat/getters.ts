import { GetterTree } from 'vuex'
import { ChatState, Message, Getters, Cart, Question } from './types'
import { RootState, ValueOf } from '@/store/types'

type GetterDefinition = {
  [K in Getters]: ValueOf<GetterTree<ChatState, RootState>>;
}

export const getters: GetterDefinition = {
  [Getters.state](state): string | undefined {
    if (state.states.length) {
      return state.states[state.states.length - 1]
    }

    return undefined
  },
  [Getters.question]({ questions }): Question | undefined {
    return questions[questions.length - 1]
  }
}
