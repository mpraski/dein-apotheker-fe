export type Maybe<T> = T | undefined

export function chunk<T>(list: T[], size = 2): Maybe<T>[][] {
    let i, j: number
    const arr: Maybe<T>[][] = []

    for (i = 0, j = list.length; i < j; i += size) {
        arr.push(list.slice(i, i + size))
    }

    const last = arr[arr.length - 1]

    while (j < i) {
        last.push(undefined)
        j++
    }

    return arr
}
