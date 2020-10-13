import { GetterTree } from 'vuex'
import { InputState, Input, Getters } from './types'
import { RootState, ValueOf } from '@/store/types'

type GetterDefinition = {
    [K in Getters]: ValueOf<GetterTree<InputState, RootState>>;
}

export const getters: GetterDefinition = {
  [Getters.input] (state): Input {
    return state.input!
  },

  [Getters.showInput] (state): boolean {
    return state.show
  }
}
