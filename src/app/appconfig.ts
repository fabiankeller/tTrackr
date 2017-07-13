import {JsonMember, JsonObject} from "typedjson-npm";

@JsonObject
export class AppConfig {
    @JsonMember
    lastLoaded: string;
}
