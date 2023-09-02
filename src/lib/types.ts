import type { Writable } from "svelte/store";


export interface UserData {
    startDate: Writable<Date>
    dateFormat: Writable<string>
    count: Writable<number>
    float: Writable<boolean>
    low: Writable<number>
    high: Writable<number>
}
export interface UserDataVals {
    startDate: Date
    dateFormat: string
    count: number
    float: boolean
    low: number
    high: number
}
