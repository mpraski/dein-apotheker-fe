import { GetterTree } from 'vuex'
import { InputState, Getters } from './types'
import { RootState, ValueOf } from '@/store/types'

type GetterDefinition = {
    [K in Getters]: ValueOf<GetterTree<InputState, RootState>>;
}

export const getters: GetterDefinition = {
  [Getters.showInput] (state): boolean {
    return state.show
  }
}
