export abstract class BaseDate {
    protected currentDate: string | number;

    constructor(date: string | number) {
        this.currentDate = date;
    }

    abstract next(): void;

    getCurrentDate(): string | number {
        return this.currentDate
    }
}

export class UnixDate extends BaseDate {
    constructor(date: Date) {
        const newDate = UnixDate.convert(date)
        super(newDate)
    }
    static convert(initDate: Date) {
        return Math.floor(initDate.getTime() / 1000)
    }
    next() {
        if (typeof this.currentDate === 'number') {
            this.currentDate = this.currentDate + 24 * 60 * 60
        }
    }

}


export class Rfc3339Date extends BaseDate {
    constructor(date: Date) {
        const newDate = Rfc3339Date.convert(date)
        super(newDate)
    }
    static convert(initDate: Date) {
        return initDate.toISOString();
    }
    next() {
        const nextDate = new Date(this.currentDate);

        nextDate.setUTCDate(nextDate.getUTCDate() + 1);

        const nextRfc3339Date = nextDate.toISOString();
        this.currentDate = nextRfc3339Date; // Update the currentDate property
        return nextRfc3339Date;
    }
}
export class DateTime extends BaseDate {
    constructor(date: Date) {
        const newDate = DateTime.convert(date)
        super(newDate)
    }
    static convert(initDate: Date) {
        const year = initDate.getFullYear();
        const month = String(initDate.getMonth() + 1).padStart(2, '0');
        const day = String(initDate.getDate()).padStart(2, '0');
        const hours = String(initDate.getHours()).padStart(2, '0');
        const minutes = String(initDate.getMinutes()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}`; // Custom DateTime format

    }
    next() {
        const nextDay = new Date(this.currentDate);
        nextDay.setDate(nextDay.getDate() + 1);

        const nextDateOnly = DateTime.convert(nextDay);

        this.currentDate = nextDateOnly;
        return nextDateOnly;
    }
}


