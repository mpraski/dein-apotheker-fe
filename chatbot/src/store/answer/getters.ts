import { GetterTree } from 'vuex'
import { AnswerState, Getters, Question } from './types'
import { RootState, ValueOf } from '@/store/types'

type GetterDefinition = {
    [K in Getters]: ValueOf<GetterTree<AnswerState, RootState>>;
}

export const getters: GetterDefinition = {
  [Getters.currentQuestion] (state): Question | undefined {
    return state.questions[state.questions.length - 1]
  }
}
