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

// Utilities
export const extractAnswer = (a: Answer): Array<string> => {
  if (Array.isArray(a)) {
    return a.map(a => a.id)
  }

  if (a instanceof Object) {
    return [a.id]
  } else {
    return [a]
  }
}

export const formatAnswer = (a: Answer): string => {
  if (Array.isArray(a)) {
    return a.map(a => a.content).join()
  }

  if (a instanceof Object) {
    return a.content
  } else {
    return a
  }
}
