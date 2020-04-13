import { ActionTree } from 'vuex'
import { AnswerState, Record, Question, Actions, Mutations } from './types'
import { RootState, ValueOf } from '@/store/types'

type ActionDefinition = {
  [K in Actions]: ValueOf<ActionTree<AnswerState, RootState>>;
}

export const actions: ActionDefinition = {
  [Actions.addRecord] ({ commit }, record: Record): any {
    commit(Mutations.addRecord, record)
  },

  [Actions.addQuestion] ({ commit }, question: Question): any {
    commit(Mutations.addQuestion, question)
  },

  [Actions.rewind] ({ commit }, record: Record): any {
    commit(Mutations.addQuestion, record)
  }
}
