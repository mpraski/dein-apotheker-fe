declare module 'domain' {
    type Kind = "single" | "multiple" | "text";

    type ID = string;

    interface Option {
        id: ID;
        content: string;
    }

    interface Question {
        id: ID;
        content: string;
        kind: Kind;
        options?: ReadonlyArray<Option>;
    }

    interface Comment {
        content: string;
    }

    interface Scenario {
        id: ID;
        answers: Array<Answer>;
    }

    type Answer = string | ID | ReadonlyArray<ID>;

    type History = Array<Scenario>;

    type Message = Question | Comment;
}