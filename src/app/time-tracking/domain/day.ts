import {JsonMember, JsonObject} from "typedjson-npm/src/typed-json";

@JsonObject
export class Day {
    @JsonMember
    id: number;

    @JsonMember
    hours: number;

    @JsonMember
    message: string;
}
