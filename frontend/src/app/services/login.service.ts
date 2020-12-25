import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UrlService} from "./url.service";
import {User} from "../models/user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http: HttpClient, private urlService: UrlService) {
  }

  login(user: User) {
    return this.http.post(this.urlService.url + '/login', user, {observe: 'response'});
  }

  getUser(): Observable<User> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders().append('Authorization', token);
    return this.http.get<User>(this.urlService.url + '/authUser', {headers});
  }

  logout() {
    localStorage.clear();
  }
}
