import { ActionTree } from 'vuex'
import { AnswerState, Question, Actions, Mutations, Answer, Context } from './types'
import { RootState, ValueOf } from '@/store/types'

type ActionDefinition = {
  [K in Actions]: ValueOf<ActionTree<AnswerState, RootState>>;
}

export const actions: ActionDefinition = {
  [Actions.addAnswer] ({ commit }, answer: Answer) {
    commit(Mutations.addAnswer, answer)
  },

  [Actions.addQuestion] ({ commit }, question: Question) {
    commit(Mutations.addQuestion, question)
  },

  [Actions.addContext] ({ commit }, context: Context) {
    commit(Mutations.addContext, context)
  },

  [Actions.rewind] ({ commit }, index: number) {
    commit(Mutations.rewind, index)
  }
}
