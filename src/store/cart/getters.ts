import { GetterTree } from 'vuex'
import { CartState, Getters } from './types'
import { RootState, ValueOf } from '@/store/types'

type GetterDefinition = {
  [K in Getters]: ValueOf<GetterTree<CartState, RootState>>;
}

export const getters: GetterDefinition = {
  [Getters.itemCount] (state): number {
    return state.map(([_, c]) => c).reduce((s, c) => s + c, 0)
  }
}
