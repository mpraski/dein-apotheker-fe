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

  [Mutations.rewind] (state, index: number) {
    const { questions, records } = state

    let i = 0; let j = 0
    while (i < index) {
      i += questions[j++].messages.length + 1
    }

    const recordsSave = records.slice(0, j - 1)
    const questionsSave = questions.slice(0, j)
    const questionsRemove = questions.slice(j, questions.length)

    state.records = recordsSave
    state.questions = questionsSave
    state.rewindMessages = questionsRemove
      .map(a => a.messages.length + 1)
      .reduce((a, b) => a + b, 0)
  }
}
