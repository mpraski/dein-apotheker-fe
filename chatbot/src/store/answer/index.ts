import { Module } from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { AnswerState } from './types'
import { RootState } from '@/store/types'

export const state: AnswerState = {
  rewindMessages: 0,
  answers: [],
  questions: [],
  contexts: []
}

export const answerNamespace = 'answer'

const namespaced = true

export const answer: Module<AnswerState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
