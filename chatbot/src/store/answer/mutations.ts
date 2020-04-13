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

  [Mutations.rewind] (state, question: string) {
    const predicateRecord = (r: Record): boolean => {
      return r.questionID === question
    }

    const questionPredicate = (a: Question): boolean => {
      return a.ID === question
    }

    const recordIdx = state.records.findIndex(predicateRecord)
    const questionIdx = state.questions.findIndex(questionPredicate) + 1

    const recordsSave = state.records.slice(0, recordIdx)
    const questionsSave = state.questions.slice(0, questionIdx)
    const questionsRemove = state.questions.slice(questionIdx, state.questions.length)

    state.records = recordsSave
    state.questions = questionsSave
    state.rewindMessages = questionsRemove.map(a => a.messages.length + 1).reduce((a, b) => a + b)
  }
}
