import {JsonMember, JsonObject} from "typedjson-npm";

@JsonObject
export class Day {
    @JsonMember
    id: number;

    @JsonMember
    hours: number;

    @JsonMember
    message: string;
}
