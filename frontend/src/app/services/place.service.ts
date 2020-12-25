import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UrlService} from "./url.service";
import {FoodPlace} from "../models/food-place";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(public http: HttpClient, public urlService: UrlService) {
  }

  getPlaces(): Observable<FoodPlace[]> {
    return this.http.get<FoodPlace[]>(this.urlService.url);
  }
}
