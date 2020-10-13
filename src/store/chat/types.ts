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

export type Input = QuestionOption | Database | Product | null

export interface Message {
  question: string;
  text: string;
  type: QuestionType;
  input: Input;
}

export type Cart = Array<Product>;

export interface Chat {
  id: string;
  message: Message;
  cart: Cart;
}

export interface ChatState {
  showInput: boolean;
  message?: Message;
  states: Array<string>;
  cart: Cart;
}

// Keys
export enum Mutations {
  addChat = 'addChat',
  clear = 'clear'
}

export enum Actions {
  addChat = 'addChat',
  clear = 'clear'
}

export enum Getters {
  input = 'input',
  state = 'state',
  message = 'message',
  cart = 'cart'
}

export const emptyState: () => ChatState = () => ({
  showInput: false,
  message: undefined,
  states: [],
  cart: []
})
