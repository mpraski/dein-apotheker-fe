import { Option } from '@/store/input/types'

export type Answer = string | Option | Array<Option>;

export type Scenario = string;

export interface AnswerState {
    currentAnswer?: Answer;
    currentScenario?: Scenario;
    history: Array<[Answer, Scenario]>;
}

// Keys
export enum Mutations {
    provideAnswer = 'provideAnswer',
    changeScenario = 'changeScenario',
}

export enum Actions {
    provideAnswer = 'provideAnswer',
    changeScenario = 'changeScenario',
}
