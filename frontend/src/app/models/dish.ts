import {FoodPlace} from "./food-place";

export class Dish {
  constructor(public dishId?: number,
              public dishTitle?: string,
              public price?: number,
              public menuSection?: string,
              public place?: FoodPlace,
              public picture?: string) {
  }
}
