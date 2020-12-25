import {Client} from "./client";
import {FoodPlace} from "./food-place";
import {OrderStatus} from "./enums/order-status";

export class Order {
  constructor(public orderId?: number,
              public totalPrice?: number,
              public dishes?: { [key: string]: number },
              public client?: Client,
              public place?: FoodPlace,
              public orderDate?: string,
              public orderStatus?: OrderStatus | string) {
  }
}
