import {Day} from "./day";
export class Month {
    id: number;
    days: Day[];

    getDay(givenDay: number) {
        return this.days.find((day) => {
            return day.id === givenDay;
        })
    }
}
