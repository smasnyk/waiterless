import {Injectable} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {UrlService} from "./url.service";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  socketEndPoint = this.urlService.url + '/socket';

  constructor(public urlService: UrlService) {
  }

  connect() {
    let socket = new SockJS(this.socketEndPoint);
    let stompClient = Stomp.over(socket);
    stompClient.debug = () => {
    };
    return stompClient;
  }
}
