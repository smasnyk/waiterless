import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UrlService} from "./url.service";
import {Client} from "../models/client";
import {FoodPlace} from "../models/food-place";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(public http: HttpClient, private url: UrlService) {
  }

  registerClient(user: Client) {
    return this.http.post(this.url.url + "/user/signUp", user);
  }

  registerPlace(user: FoodPlace) {
    return this.http.post(this.url.url + "/place/signUp", user);
  }
}
