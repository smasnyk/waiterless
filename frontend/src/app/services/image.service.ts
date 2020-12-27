import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UrlService} from "./url.service";
import {Client} from "../models/client";
import {Observable} from "rxjs";
import {FoodPlace} from "../models/food-place";
import {Dish} from "../models/dish";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(public http: HttpClient, private urlService: UrlService) {
  }

  setClientPicture(file: File, client: Client, uuid): Observable<Client> {
    const formData = new FormData();
    formData.append('file', file, uuid);
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders().append('Authorization', token);
    return this.http.put<Client>(this.urlService.url + '/user/' + client.id + '/addPhoto', formData, {headers});
  }

  setPlacePicture(file: File, place: FoodPlace, uuid): Observable<FoodPlace> {
    const formData = new FormData();
    formData.append('file', file, uuid);
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders().append('Authorization', token);
    return this.http.put<FoodPlace>(this.urlService.url + '/place/' + place.id + '/addPhoto', formData, {headers});
  }

  setDishPicture(file: File, dish: Dish, uuid): Observable<Dish> {
    const formData = new FormData();
    formData.append('file', file, uuid);
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders().append('Authorization', token);
    return this.http.put<Dish>(this.urlService.url + '/dish/' + dish.dishId + '/addPhoto', formData, {headers});
  }
}
