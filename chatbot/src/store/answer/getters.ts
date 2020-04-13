import { GetterTree } from 'vuex'
import { AnswerState, Getters, Scenario } from './types'
import { RootState, ValueOf } from '@/store/types'

type GetterDefinition = {
    [K in Getters]: ValueOf<GetterTree<AnswerState, RootState>>;
}

export const getters: GetterDefinition = {
  [Getters.currentQuestionID] (state): string | undefined {
    return state.questions[state.questions.length - 1].ID
  },

  [Getters.currentScenario] (state): Scenario | undefined {
    return state.questions[state.questions.length - 1].scenario
  }
}
