import {Component, OnInit} from '@angular/core';
import {Client} from "../../models/client";
import {LoginService} from "../../services/login.service";
import {ClientService} from "../../services/client.service";
import {Sex} from "../../models/enums/sex";

@Component({
  selector: 'app-user',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  editable: boolean = false;
  user: Client;
  genders = Object.keys(Sex);

  constructor(public loginService: LoginService,
              public clientService: ClientService) {
  }

  ngOnInit() {
    if (localStorage.getItem('token') != null)
      this.loginService.getUser().subscribe(value => this.user = value);
  }

  editClient() {
    this.clientService.editClient(this.user).subscribe(value => this.user = value);
    this.editable = false;
  }
}
