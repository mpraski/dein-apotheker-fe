import { ActionTree } from 'vuex'
import { AnswerState, Answer, Scenario, Actions, Mutations } from './types'
import { RootState, ValueOf } from '@/store/types'

type ActionDefinition = {
  [K in Actions]: ValueOf<ActionTree<AnswerState, RootState>>;
}

export const actions: ActionDefinition = {
  [Actions.provideAnswer] ({ commit }, payload: Answer): any {
    commit(Mutations.provideAnswer, payload)
  },

  [Actions.changeScenario] ({ commit }, scenario: Scenario): any {
    commit(Mutations.changeScenario, scenario)
  }
}
