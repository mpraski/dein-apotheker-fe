import { GetterTree } from 'vuex'
import { ScrollerState, Getters } from './types'
import { RootState, ValueOf } from '@/store/types'

type GetterDefinition = {
  [K in Getters]: ValueOf<GetterTree<ScrollerState, RootState>>;
}

export const getters: GetterDefinition = {
  [Getters.height]({ height }): number {
    return height
  },
  [Getters.contentHeight]({ contentHeight }): number {
    return contentHeight
  }
}
