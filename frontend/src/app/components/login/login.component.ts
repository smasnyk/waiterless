import {Component} from '@angular/core';
import {LoginService} from "../../services/login.service";
import {User} from "../../models/user";
import {MatDialogRef} from "@angular/material/dialog";
import {EventService} from "../../services/event.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User = new User();

  constructor(private loginService: LoginService,
              public dialogRef: MatDialogRef<LoginComponent>,
              private eventEmitter: EventService) {
  }

  submit() {
    this.loginService.login(this.user).subscribe(res => {
      const token = res.headers.get("Authorization");
      localStorage.setItem('token', token);
      location.reload();
    })
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
    this.eventEmitter.onRegClick();
  }
}
