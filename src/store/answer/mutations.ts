import { MutationTree } from 'vuex'
import { AnswerState, Question, Mutations, Answer, Context } from './types'
import { ValueOf } from '@/store/types'

type MutationDefinition = {
  [K in Mutations]: ValueOf<MutationTree<AnswerState>>;
}

export const mutations: MutationDefinition = {
  [Mutations.addAnswer] (state, answer: Answer) {
    state.answers.push(answer)
  },

  [Mutations.addQuestion] (state, question: Question) {
    state.questions.push(question)
  },

  [Mutations.addContext] (state, context: Context) {
    state.contexts.push(context)
  },

  [Mutations.rewind] (state, index: number) {
    const { questions, answers, contexts } = state

    let i = 0; let j = 0
    while (i < index) {
      i += questions[j++].messages.length + 1
    }

    const questionsKeep = questions.slice(0, j)
    const questionsRemove = questions.slice(j, questions.length)

    state.answers = answers.splice(0, j - 1)
    state.contexts = contexts.splice(0, j)
    state.questions = questionsKeep
    state.rewindMessages = questionsRemove
      .map(a => a.messages.length + 1)
      .reduce((a, b) => a + b, 0)
  }
}
