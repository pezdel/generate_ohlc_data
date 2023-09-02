// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
    // interface Locals {}
    // interface PageData {}
    // interface Error {}
    // interface Platform {}
    interface Array<T> {
        findLastIndex(
            predicate: (value: T, index: number, obj: T[]) => unknown,
            thisArg?: any
        ): number
    }
}

export { }
declare global {
    interface Array<T> {
        findLastIndex(
            predicate: (value: T, index: number, obj: T[]) => unknown,
            thisArg?: any
        ): number
    }
}
