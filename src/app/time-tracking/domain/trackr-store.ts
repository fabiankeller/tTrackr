import {Year} from "./year";
import {Day} from "./day";
export class TrackrStore {
    entities: Year[];

    getDayByDate(date: Date) {
        let parsedDate = this.splitDate(date);

        return this.getYear(parsedDate.year).getMonth(parsedDate.month).getDay(parsedDate.day);
    }

    getWeekByDate(date: Date): Day[] {
        let monday = this.getMonday(date);
        let week = [];

        for (let i = 0; i < 7; i++) {
            week.push(this.getDayByDate(date));
            date.setDate(date.getDate() + 1);
        }

        return week;
    }

    getDaysForMonthByDate(date: Date) {
        let parsedDate = this.splitDate(date);

        return this.getYear(parsedDate.year).getMonth(parsedDate.month).days;
    }

    getMonday(date: Date): Date {
        let day = date.getDay() || 7;
        if (day !== 1) {
            date.setHours(-24 * (day - 1));
        }

        return date;
    }

    private getYear(givenYear: number) {
        return this.entities.find(year => {
            return year.id === givenYear;
        });
    }

    private splitDate(date: Date) {
        return {
            day: date.getDate(),
            month: date.getMonth() + 1, //month start at 0, for readability purposes we go for actual month numbers
            year: date.getFullYear()
        };
    }
}
