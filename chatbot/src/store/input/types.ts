export interface Option {
    id: string;
    content: string;
}

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

export interface InputState {
    show: boolean;
    input?: Input;
}

// Keys
export enum Mutations {
    showInput = 'showInput',
    hideInput = 'hideInput'
}

export enum Actions {
    showInput = 'showInput',
    hideInput = 'hideInput'
}

export enum Getters {
    showInput = 'showInput',
}
