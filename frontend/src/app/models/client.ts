import {User} from "./user";
import {Sex} from "./enums/sex";

export class Client extends User {
  constructor(public sex?: Sex) {
    super();
  }
}
