export function spread (
  initial: number,
  delay: number,
  ...fs: Array<() => void>
) {
  for (let i = 0; i < fs.length; i++) {
    setTimeout(fs[i], initial + i * delay)
  }
}

export const defaultSpread = (...fs: Array<() => void>) => spread(300, 300, ...fs)
