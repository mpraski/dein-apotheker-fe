import { defaultWith } from '../types'

type Nullable<T> = T | null;

export type QuestionType = 'question' | 'product' | 'product_list' | 'list' | 'comment' | 'free' | 'date'

export type DatabaseType = 'Products' | 'Brands' | 'API'

export interface QuestionOption {
  id: string;
  text: string;
}

export interface Brand {
  id: string;
  name: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  image: string;
}

export interface API {
  id: string;
  name: string;
  image: string;
}

export type Row = Product | Brand | API

export interface Database {
  database: DatabaseType;
  rows: Array<Row>;
}

export interface ProductInput {
  answers: Array<QuestionOption>;
  product: Product;
}

export type Input = Array<QuestionOption> | Database | ProductInput | null

export interface Message {
  question: string;
  text: string;
  type: QuestionType;
  input: Input;
  popup: Nullable<Popup>;
}

export interface Popup {
  hint: string;
  content: string;
}

export type Cart = Array<Product>;

export type State = string;

export type Question = string;

export type AnswerValue = string | Array<string> | null;

export interface Answer {
  state: string;
  answer: string | Array<string> | null;
}

export interface ChatState {
  showInput: boolean;
  message?: Message;
  answer?: Answer;
  questions: Array<Question>;
  states: Array<State>;
  cart: Array<Product>;
}

// Keys
export enum Mutations {
  showInput = 'showInput',
  hideInput = 'hideInput',
  addCart = 'addCart',
  addAnswer = 'addAnswer',
  addMessage = 'addMessage',
  addState = 'addState',
  addQuestion = 'addQuestion',
  clear = 'clear'
}

export enum Actions {
  showInput = 'showInput',
  hideInput = 'hideInput',
  addAnswer = 'addAnswer',
  addResponse = 'addResponse',
  clear = 'clear'
}

export enum Getters {
  state = 'state',
  question = 'question'
}

export const emptyState = defaultWith<ChatState>(() => ({
  showInput: false,
  message: undefined,
  answer: undefined,
  questions: [],
  states: [],
  cart: []
}))
