import { MutationTree } from 'vuex'
import { AnswerState, Record, Question, Mutations } from './types'
import { ValueOf } from '@/store/types'

type MutationDefinition = {
  [K in Mutations]: ValueOf<MutationTree<AnswerState>>;
}

export const mutations: MutationDefinition = {
  [Mutations.addRecord] (state, record: Record) {
    state.records.push(record)
  },

  [Mutations.addQuestion] (state, question: Question) {
    state.questions.push(question)
  },

  [Mutations.rewind] (state, record: Record) {
    const predicateRecord = (r: Record): boolean => {
      return r.QuestionID === record.QuestionID && r.answer === record.answer
    }

    const questionPredicate = (a: Question): boolean => {
      return a.ID === record.QuestionID
    }

    const recordIdx = state.records.findIndex(predicateRecord)
    const questionIdx = state.questions.findIndex(questionPredicate)
  }
}
