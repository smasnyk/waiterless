import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UrlService} from "./url.service";
import {Dish} from "../models/dish";
import {FoodPlace} from "../models/food-place";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(public http: HttpClient, private urlService: UrlService) {
  }

  saveDish(dish: Dish, place: FoodPlace): Observable<Dish> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders().append('Authorization', token);
    return this.http.post<Dish>(this.urlService.url + '/place/' + place.id + '/addDish', dish, {headers});
  }

  editDish(dish: Dish): Observable<Dish> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders().append('Authorization', token);
    return this.http.put<Dish>(this.urlService.url + '/dish/' + dish.dishId + '/editDish', dish, {headers});
  }

  getDishes(place: FoodPlace): Observable<Dish[]> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders().append('Authorization', token);
    return this.http.get<Dish[]>(this.urlService.url + '/place/' + place.id + '/dishes', {headers});
  }
}
