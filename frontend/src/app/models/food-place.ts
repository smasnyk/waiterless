import {User} from "./user";
import {PlaceType} from "./enums/place-type";

export class FoodPlace extends User {
  constructor(public placeType?: PlaceType,
              public orderStatuses?: string[],
              public menuSections?: Object | { [key: string]: string }) {
    super();
  }
}
