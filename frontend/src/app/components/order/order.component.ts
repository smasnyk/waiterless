import {Component, LOCALE_ID, OnInit} from '@angular/core';
import {EventService} from "../../services/event.service";
import {User} from "../../models/user";
import {OrderService} from "../../services/order.service";
import {Role} from "../../models/enums/role";
import {Order} from "../../models/order";
import {registerLocaleData} from "@angular/common";
import locale from '@angular/common/locales/uk'
import {FoodPlace} from "../../models/food-place";
import {OrderStatus} from "../../models/enums/order-status";

registerLocaleData(locale, 'uk');

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [{provide: LOCALE_ID, useValue: 'uk-UKR'}]
})
export class OrderComponent implements OnInit {
  user: User;
  place: FoodPlace;
  orders: Order[];
  roles = Object.values(Role);
  statuses = Object.keys(OrderStatus);

  constructor(private eventEmitter: EventService,
              public orderService: OrderService) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.eventEmitter.user.subscribe(value => this.user = value);
      if (this.user.role === this.roles[0])
        this.orderService.getUserOrders(this.user).subscribe(value => this.orders = value);
      else if (this.user.role === this.roles[1]) {
        this.orderService.getPlaceOrders(this.user).subscribe(value => this.orders = value);
        this.place = this.user;
      }
    }, 200);
  }

  editOrderStatus(order: Order) {
    this.orderService.editOrder(order).subscribe(value => order = value);
  }
}
