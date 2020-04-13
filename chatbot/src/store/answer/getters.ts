import { GetterTree } from 'vuex'
import { AnswerState, Getters } from './types'
import { RootState, ValueOf } from '@/store/types'

type GetterDefinition = {
    [K in Getters]: ValueOf<GetterTree<AnswerState, RootState>>;
}

export const getters: GetterDefinition = {
  [Getters.lastQuestionID] (state): string {
    return state.questions[state.questions.length - 1].ID!
  }
}
