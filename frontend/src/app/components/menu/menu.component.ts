import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Dish} from "../../models/dish";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {DishService} from "../../services/dish.service";
import {OrderService} from "../../services/order.service";
import {Order} from "../../models/order";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatStepper} from "@angular/material/stepper";
import {FormControl} from "@angular/forms";
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
import {MatDatepicker} from "@angular/material/datepicker";
import {WebSocketService} from "../../services/web-socket.service";

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [{
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
  }, {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}, {provide: MAT_DATE_LOCALE, useValue: 'uk-UKR'}]
})

export class MenuComponent implements OnInit {
  order: Order = new Order();
  dishes: Dish[];
  menu: string[] = [];
  values: Map<string, number>;
  shown: boolean = true;
  cardNumber: string = '';
  minDate = moment();

  @ViewChild('stepper', {static: false}) stepper: MatStepper;
  @ViewChild('picker', {static: false}) picker: MatDatepicker<Moment>;
  date = new FormControl({value: moment(), disabled: true});

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              public dishService: DishService,
              public orderService: OrderService,
              private snackBar: MatSnackBar,
              public socketService: WebSocketService) {
  }

  ngOnInit() {
    this.menu = Object.values(this.data.place.menuSections);
    this.dishService.getDishes(this.data.place).subscribe(value => this.dishes = value);
    setTimeout(() => this.values = new Map(this.dishes.map(value => [value.dishId.toString(), 0])), 100);
  }

  nextStep() {
    this.stepper.selected.completed = true;
    this.stepper.next();
    this.shown = !this.shown;
  }

  makeOrder() {
    this.order.dishes = {};
    for (let [key, value] of this.values) if (value > 0)
      this.order.dishes[key] = value;
    if (Object.keys(this.order.dishes).length > 0) {
      this.orderService.saveOrder(this.data.user, this.data.place, this.order).subscribe(value => this.order = value);
      this.notify(this.data.place.id, 'new order');
      this.nextStep();
    } else this.snackBar.open('Перелік страв замовлення порожній!', 'Ок', {
      duration: 1000,
      panelClass: ['white-snackbar']
    });
  }

  notify(id: number, message: string) {
    let stompClient = this.socketService.connect();
    stompClient.connect({}, () => {
      stompClient.send('/app/notification/' + id, {}, JSON.stringify(message));
    })
  }

  handlePlus(i: string) {
    this.values.set(i, this.values.get(i) + 1);
  }

  handleMinus(i: string) {
    if (this.values.get(i) > 0)
      this.values.set(i, this.values.get(i) - 1);
  }

  setSpace() {
    for (let i = 0, j = 0; i < this.cardNumber.length; i += 5) if (this.cardNumber.charAt(i + j) != ' ') {
      this.cardNumber = this.cardNumber.slice(0, i + j) + ' ' + this.cardNumber.slice(i + j);
      j++;
    }
  }

  handleYear(year: Moment) {
    const value = this.date.value;
    value.year(year.year());
    this.date.setValue(value);
  }

  handleMonth(month: Moment) {
    const value = this.date.value;
    value.month(month.month());
    this.date.setValue(value);
    this.picker.close();
  }
}
