import { Input, Option } from '@/store/input/types'
import { Message } from '@/store/message/types'

export type Answer = string | Option | Array<Option>;

export interface Question {
  ID: string;
  scenario: string;
  input: Input;
  messages: ReadonlyArray<Message>;
}

export interface Record {
  questionID: string;
  scenario: string;
  answer: Answer;
}

export interface AnswerState {
  rewindMessages: number;
  records: Array<Record>;
  questions: Array<Question>;
}

// Keys
export enum Mutations {
  addRecord = 'addRecord',
  addQuestion = 'addQuestion',
  rewind = 'rewind'
}

export enum Actions {
  addRecord = 'addRecord',
  addQuestion = 'addQuestion',
  rewind = 'rewind'
}

export enum Getters {
  currentQuestion = 'currentQuestion'
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
    return a.map(a => a.content).join(' + ')
  }

  if (a instanceof Object) {
    return a.content
  } else {
    return a
  }
}
