import {Role} from "./enums/role";

export class User {
  constructor(public id?: number,
              public name?: string,
              public username?: string,
              public password?: string,
              public role?: Role,
              public token?: string,
              public picture?: string) {
  }
}
