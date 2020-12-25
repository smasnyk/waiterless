import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {RegistrationComponent} from "../registration/registration.component";
import {LoginComponent} from "../login/login.component";
import {EventService} from "../../services/event.service";
import {Router} from "@angular/router";
import {LoginService} from "../../services/login.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn: string;
  user: User;

  constructor(public dialog: MatDialog,
              private eventEmitter: EventService,
              public router: Router,
              public loginService: LoginService) {
  }

  ngOnInit() {
    if (localStorage.getItem('token') != null) this.loginService.getUser().subscribe((value => this.user = value));
    this.loggedIn = localStorage.getItem('token');
    if (this.eventEmitter.subVar == undefined) this.eventEmitter.subVar = this.eventEmitter.openFunction.subscribe(() => this.openReg());
  }

  openReg() {
    this.dialog.open(RegistrationComponent, {});
  }

  openLogin() {
    this.dialog.open(LoginComponent, {});
  }

  reload() {
    this.router.navigateByUrl("/").then();
    setTimeout(() => location.reload());
  }

  logout() {
    this.loginService.logout();
    this.reload();
  }
}
