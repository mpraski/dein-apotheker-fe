import { GetterTree } from 'vuex'
import { PopupState, Getters } from './types'
import { RootState, ValueOf } from '@/store/types'

type GetterDefinition = {
  [K in Getters]: ValueOf<GetterTree<PopupState, RootState>>;
}

export const getters: GetterDefinition = {}
