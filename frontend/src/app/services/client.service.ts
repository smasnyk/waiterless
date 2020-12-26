import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {UrlService} from "./url.service";
import {Client} from "../models/client";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(public http: HttpClient, public urlService: UrlService) {
  }

  editClient(client: Client): Observable<Client> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders().append('Authorization', token);
    return this.http.put<Client>(this.urlService.url + '/user/' + client.id + '/editUser', client, {headers});
  }
}
