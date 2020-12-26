import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UrlService} from "./url.service";
import {Order} from "../models/order";
import {Observable} from "rxjs";
import {Client} from "../models/client";
import {FoodPlace} from "../models/food-place";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(public http: HttpClient, private urlService: UrlService) {
  }

  saveOrder(user: Client, place: FoodPlace, order: Order): Observable<Order> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders().append('Authorization', token);
    return this.http.post<Order>(this.urlService.url + '/user/' + user.id + '/place/' + place.id + '/order', order, {headers});
  }

  editOrder(order: Order): Observable<Order> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders().append('Authorization', token);
    return this.http.put<Order>(this.urlService.url + '/place/' + order.orderId + '/editOrder', order, {headers});
  }

  getUserOrders(user: Client): Observable<Order[]> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders().append('Authorization', token);
    return this.http.get<Order[]>(this.urlService.url + '/user/' + user.id + '/orders', {headers});
  }

  getPlaceOrders(place: FoodPlace): Observable<Order[]> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders().append('Authorization', token);
    return this.http.get<Order[]>(this.urlService.url + '/place/' + place.id + '/orders', {headers});
  }

}
