export interface Option {
    id: string;
    content: string;
}

export interface InputSingle {
    type: 'single';
    options: ReadonlyArray<Option>;
}

export interface InputMultiple {
    type: 'multiple';
    options: ReadonlyArray<Option>;
}

export interface InputPrompt {
    type: 'prompt';
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
    input = 'input',
    showInput = 'showInput',
}
