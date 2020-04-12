import { Input } from '@/store/input/types'
import { Message } from '@/store/message/types'
import { Scenario } from '@/store/answer/types'

export interface AnswerResponse {
    messages: ReadonlyArray<Message>;
    scenario: Scenario;
    input: Input;
}
