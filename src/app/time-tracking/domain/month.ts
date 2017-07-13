import {Day} from "./day";
import {JsonMember, JsonObject} from "typedjson-npm";

@JsonObject
export class Month {

    @JsonMember id: number;

    @JsonMember({ elements: Day}) days: Day[];

    getDay(givenDay: number): Day {
        return this.days.find((day) => {
            return day.id === givenDay;
        })
    }
}
