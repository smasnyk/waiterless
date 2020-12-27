import {Component, OnInit} from '@angular/core';
import {Client} from "../../models/client";
import {LoginService} from "../../services/login.service";
import {ClientService} from "../../services/client.service";
import {Sex} from "../../models/enums/sex";
import {UuidService} from "../../services/uuid.service";
import {ImageService} from "../../services/image.service";

@Component({
  selector: 'app-user',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  editable: boolean = false;
  user: Client;
  genders = Object.keys(Sex);
  file: File;

  constructor(public loginService: LoginService,
              public clientService: ClientService,
              public imageService: ImageService,
              public uuidService: UuidService) {
  }

  ngOnInit() {
    if (localStorage.getItem('token') != null)
      this.loginService.getUser().subscribe(value => this.user = value);
  }

  editClient() {
    this.clientService.editClient(this.user).subscribe(value => this.user = value);
    this.editable = false;
  }

  onPicUpload(event) {
    this.file = event.target.files[0];
    if (this.file != null) {
      this.user.picture = this.uuidService.generateName(this.file);
      this.imageService.setClientPicture(this.file, this.user, this.user.picture).subscribe();
    }
    setTimeout(() => location.reload(), 100);
  }
}
