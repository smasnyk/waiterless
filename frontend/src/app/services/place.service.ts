import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {UrlService} from "./url.service";
import {FoodPlace} from "../models/food-place";
import {Observable} from "rxjs";
import {MenuSection} from "../models/enums/menu-section";

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(public http: HttpClient, public urlService: UrlService) {
  }

  getPlaces(): Observable<FoodPlace[]> {
    return this.http.get<FoodPlace[]>(this.urlService.url);
  }

  getPlace(id: number): Observable<FoodPlace> {
    return this.http.get<FoodPlace>(this.urlService.url + '/place/' + id);
  }

  editPlace(place: FoodPlace): Observable<FoodPlace> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders().append('Authorization', token);
    return this.http.put<FoodPlace>(this.urlService.url + '/place/' + place.id + '/editPlace', place, {headers});
  }

  addMenuSection(place: FoodPlace, section: Object): Observable<Object> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders().append('Authorization', token);
    return this.http.post<Map<MenuSection, string>>(this.urlService.url + '/place/' + place.id + '/addSection', section, {headers});
  }

  addOrderStatus(place: FoodPlace, status: string): Observable<string[]> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders().append('Authorization', token);
    return this.http.post<string[]>(this.urlService.url + '/place/' + place.id + '/addStatus', status, {headers});
  }

  getStats(place: FoodPlace, section?: string, date?: string): Observable<Object> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders().append('Authorization', token);
    let params = new HttpParams();
    if (section) params = params.set("section", section);
    if (date) params = params.set("date", date);
    return this.http.get<Object>(this.urlService.url + '/place/' + place.id + '/stats', {params, headers});
  }
}
