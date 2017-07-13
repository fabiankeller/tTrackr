import {JsonMember, JsonObject} from "typedjson-npm/src/typed-json";

@JsonObject
export class AppConfig {
    @JsonMember
    lastLoaded: string;
}
