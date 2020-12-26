import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UrlService} from "./url.service";
import {Observable} from "rxjs";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(public http: HttpClient, private urlService: UrlService) {
  }

  getUsers(): Observable<User[]> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders().append('Authorization', token);
    return this.http.get<User[]>(this.urlService.url + '/admin/users', {headers});
  }
}
