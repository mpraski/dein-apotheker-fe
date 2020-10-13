export interface Chat {
  id: string;
  message: object;
  cart: object;
}

export type ChatState = Array<Chat>;

// Keys
export enum Mutations {
  addChat = 'addChat',
}

export enum Actions {
  addChat = 'addChat',
}

export enum Getters {
  currentChat = 'currentChat'
}
