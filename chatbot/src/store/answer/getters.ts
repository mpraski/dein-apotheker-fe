import { GetterTree } from 'vuex'
import { AnswerState, Getters, Question, Context } from './types'
import { RootState, ValueOf } from '@/store/types'

type GetterDefinition = {
  [K in Getters]: ValueOf<GetterTree<AnswerState, RootState>>;
}

export const getters: GetterDefinition = {
  [Getters.currentQuestion] (state): Question | undefined {
    return state.questions[state.questions.length - 1]
  },

  [Getters.currentContext] (state): Context | undefined {
    return state.contexts[state.contexts.length - 1]
  }
}
