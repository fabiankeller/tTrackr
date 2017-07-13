import {Year} from "./year";
import {Day} from "./day";
import {Moment} from 'moment';
import {JsonMember, JsonObject} from "typedjson-npm";

@JsonObject
export class TrackrStore {
    @JsonMember({ elements: Year}) entities: Year[];

    getDayByDate(date: Moment): Day {
        let parsedDate = this.splitDate(date);
        let year = this.getYear(parsedDate.year);

        if (year) {
            let month = year.getMonth(parsedDate.month);
            if (month) {
                let day = month.getDay(parsedDate.day);
                return day ? day : new Day();
            }
        }

        return new Day();
    }

    getWeekByDate(date: Moment): Day[] {
        let monday = date.startOf("week").add(1, "days");
        let week = [];

        for (let i = 0; i < 7; i++) {
            week.push(this.getDayByDate(date));
            date.add(1, "days");
        }

        return week;
    }

    getDaysForMonthByDate(date: Moment): Day[] {
        let parsedDate = this.splitDate(date);

        return this.getYear(parsedDate.year).getMonth(parsedDate.month).days;
    }

    private getYear(givenYear: number): Year {
        return this.entities.find(year => {
            return year.id === givenYear;
        });
    }

    private splitDate(date: Moment) {
        return {
            day: date.date(),
            month: date.month() + 1, //month start at 0, for readability purposes we go for actual month numbers
            year: date.year()
        };
    }
}
