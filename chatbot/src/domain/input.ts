
import { Option } from './question'

export interface InputSingle {
    type: 'INPUT_SINGLE';
    options: ReadonlyArray<Option>;
}

export interface InputMultiple {
    type: 'INPUT_MULTIPLE';
    options: ReadonlyArray<Option>;
}

export interface InputPrompt {
    type: 'INPUT_PROMPT';
}

export type Input = InputSingle | InputMultiple | InputPrompt;
