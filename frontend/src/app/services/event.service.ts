import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject, Subscription} from "rxjs";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  openFunction = new EventEmitter();
  subVar: Subscription;
  subject: BehaviorSubject<User> = new BehaviorSubject<User>(new User());
  user = this.subject.asObservable();

  constructor() {
  }

  onRegClick() {
    this.openFunction.emit();
  }
}
