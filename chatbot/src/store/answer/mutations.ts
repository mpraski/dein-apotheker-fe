import { MutationTree } from 'vuex'
import { AnswerState, Answer, Scenario, Mutations } from './types'
import { ValueOf } from '@/store/types'

type MutationDefinition = {
  [K in Mutations]: ValueOf<MutationTree<AnswerState>>;
}

export const mutations: MutationDefinition = {
  [Mutations.provideAnswer] (state, answer: Answer) {
    state.currentAnswer = answer
    if (state.currentScenario) {
      state.history.push([answer, state.currentScenario])
    }
  },
  [Mutations.changeScenario] (state, scenario: Scenario) {
    state.currentScenario = scenario
  }
}
