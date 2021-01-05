import { GetterTree } from 'vuex'
import { ChatState, Getters, Question } from './types'
import { RootState, ValueOf } from '@/store/types'

type GetterDefinition = {
  [K in Getters]: ValueOf<GetterTree<ChatState, RootState>>;
}

const safeGet = <T>(a: T[]) => {
  if (a.length) {
    return a[a.length - 1]
  }

  return undefined
}

export const getters: GetterDefinition = {
  [Getters.state]({ states }): string | undefined {
    return safeGet(states)
  },
  [Getters.question]({ questions }): Question | undefined {
    return safeGet(questions)
  }
}
