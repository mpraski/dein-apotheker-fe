export type QuestionType = 'question' | 'product' | 'product_list' | 'list' | 'comment' | 'free'

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
}

export type Cart = Array<Product>;

export type AnswerValue = string | Array<string> | null;

export interface Answer {
  state: string;
  answer: string | Array<string> | null;
}

export interface ChatState {
  showInput: boolean;
  message?: Message;
  answer?: Answer;
  states: Array<string>;
  cart: Cart;
}

// Keys
export enum Mutations {
  showInput = 'showInput',
  hideInput = 'hideInput',
  addCart = 'addCart',
  addAnswer = 'addAnswer',
  addMessage = 'addMessage',
  addState = 'addState',
  revertMessage = 'revertMessage',
  revert = 'revert',
  clear = 'clear'
}

export enum Actions {
  showInput = 'showInput',
  hideInput = 'hideInput',
  addAnswer = 'addAnswer',
  addResponse = 'addResponse',
  revertResponse = 'revertResponse',
  revert = 'revert',
  clear = 'clear'
}

export enum Getters {
  showInput = 'showInput',
  state = 'state',
  message = 'message',
  cart = 'cart'
}

export const emptyState: (state?: Partial<ChatState>) => ChatState = (state: Partial<ChatState> = {}) => {
  const empty = {
    showInput: false,
    message: undefined,
    answer: undefined,
    states: [],
    cart: []
  }

  return Object.assign(empty, state)
}
