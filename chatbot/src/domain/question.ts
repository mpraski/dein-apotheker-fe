export type Kind = 'single' | 'multiple' | 'text';

export type ID = string;

export interface Option {
    id: ID;
    content: string;
}

export interface Question {
    id: ID;
    content: string;
    kind: Kind;
    options?: ReadonlyArray<Option>;
}

export interface Comment {
    content: string;
}

export interface Scenario {
    id: ID;
    answers: Array<Answer>;
}

export type Answer = string | ID | ReadonlyArray<ID>;

export type History = Array<Scenario>;

export type Message = Question | Comment;
