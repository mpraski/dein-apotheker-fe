import { Store } from 'vuex'
import { Driver } from './index'
import { RootState } from '@/store/types'

export const registerDriver = (driver: Driver) => (store: Store<RootState>) => {
    driver.subscribe(store)
}
