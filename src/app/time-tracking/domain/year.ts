import {Month} from "./month";
import {JsonMember, JsonObject} from "typedjson-npm";

@JsonObject
export class Year {
    @JsonMember id: number;

    @JsonMember({ elements: Month}) months: Month[];

    getMonth(givenMonth: number): Month {
        return this.months.find((month) => {
           return month.id === givenMonth;
        });
    }
}
