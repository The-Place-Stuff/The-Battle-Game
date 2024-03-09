
export function removeDuplicates<T>(array: T[]): T[] {
    return array.filter((value, index, arr) => arr.indexOf(value) == index)
}