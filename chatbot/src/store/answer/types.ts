import { Input, Option } from '@/store/input/types'
import { Message } from '@/store/message/types'

export type AnswerValue = string | Option | Array<Option>;

export type AnswerType = 'single' | 'multiple' | 'prompt' | 'end';

export interface Context {
  scenarios: Array<string>;
  question: string;
  data: object;
}

export interface Question {
  ID: string;
  input: Input;
  messages: ReadonlyArray<Message>;
}

export interface Answer {
  ID: string;
  type: AnswerType;
  value: AnswerValue;
}

export interface AnswerState {
  rewindMessages: number;
  answers: Array<Answer>;
  questions: Array<Question>;
  contexts: Array<Context>;
}

// Keys
export enum Mutations {
  addAnswer = 'addAnswer',
  addQuestion = 'addQuestion',
  addContext = 'addContext',
  rewind = 'rewind'
}

export enum Actions {
  addAnswer = 'addAnswer',
  addQuestion = 'addQuestion',
  addContext = 'addContext',
  rewind = 'rewind'
}

export enum Getters {
  currentQuestion = 'currentQuestion',
  currentContext = 'currentContext'
}

// Utilities
export const extractAnswer = (a: Answer): string | ReadonlyArray<string> => {
  const { value } = a

  if (Array.isArray(value)) {
    return value.map(v => v.id)
  }

  if (value instanceof Object) {
    return value.id
  } else {
    return value
  }
}

export const formatAnswer = (a: Answer): string => {
  const delimiter = ' + '
  const { value } = a

  if (Array.isArray(value)) {
    return value.map(v => v.content).join(delimiter)
  }

  if (value instanceof Object) {
    return value.content
  } else {
    return value
  }
}
