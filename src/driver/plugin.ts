import { Store } from 'vuex'
import { Driver } from './index'
import { RootState } from '@/store/types'
import { ChatService, SessionService } from '@/gateway/types'

export const registerDriver = (
    chat: ChatService,
    session: SessionService
) => (store: Store<RootState>) => {
    /* eslint-disable no-new */
    new Driver(chat, session, store)
}
