export const defaultIncrement = (percentage = 0.4) => {
  return percentage * window.innerHeight
}

export interface ScrollerState {
  height: number;
  scrollerHeight: number;
  contentHeight: number;
}

// Keys
export enum Mutations {
  allocate = 'allocate',
  measure = 'measure',
  revert = 'revert',
  clear = 'clear'
}

export enum Actions {
  allocate = 'allocate',
  measure = 'measure',
  revert = 'revert',
  clear = 'clear'
}

export enum Getters {
  height = 'height',
  contentHeight = 'contentHeight'
}

export const emptyState: (state?: Partial<ScrollerState>) => ScrollerState = (state: Partial<ScrollerState> = {}) => {
  const empty = {
    height: 0,
    scrollerHeight: 0,
    contentHeight: 0
  }

  return Object.assign(empty, state)
}
