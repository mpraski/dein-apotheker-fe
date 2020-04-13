import { Input, Option } from '@/store/input/types'
import { Message } from '@/store/message/types'

export type Answer = string | Option | Array<Option>;

export type Scenario = string;

export interface Question {
  ID: string;
  input: Input;
  scenario: Scenario;
  messages: ReadonlyArray<Message>;
}

export interface Record {
  QuestionID: string;
  answer: Answer;
}

export interface AnswerState {
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
  lastQuestionID = 'lastQuestionID',
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
