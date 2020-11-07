import { defaultWith } from '../types'

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

export const emptyState = defaultWith<ScrollerState>(() => ({
  height: 0,
  scrollerHeight: 0,
  contentHeight: 0
}))
