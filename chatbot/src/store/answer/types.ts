export type Answer = string | Array<string>;

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
