import {Month} from "./month";
export class Year {
    id: number;
    months: Month[];

    getMonth(givenMonth: number) {
        return this.months.find((month) => {
           return month.id === givenMonth;
        });
    }
}
