import {Component, OnInit} from '@angular/core';
import {Sex} from "../../models/enums/sex";
import {Client} from "../../models/client";
import {RegistrationService} from "../../services/registration.service";
import {Role} from "../../models/enums/role";
import {FoodPlace} from "../../models/food-place";
import {PlaceType} from "../../models/enums/place-type";
import {MatDialogRef} from "@angular/material";
import {MatDialog} from "@angular/material/dialog";
import {LoginComponent} from "../login/login.component";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user: Client = new Client();
  foodPlace: FoodPlace = new FoodPlace();
  genders = Object.keys(Sex);
  roles = Object.values(Role);
  types = Object.keys(PlaceType);
  selected: any;
  currentUser: Client;
  currentPlace: FoodPlace;

  constructor(private registrationService: RegistrationService,
              public dialogRef: MatDialogRef<RegistrationComponent>,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.selected = this.roles[0];
  }

  setValue() {
    if (this.selected === this.roles[1])
      this.foodPlace = this.user;
  }

  submit() {
    if (this.selected === this.roles[0]) this.registrationService.registerClient(this.user).subscribe(value => {
      this.currentUser = value;
    }); else this.registrationService.registerPlace(this.foodPlace).subscribe(value => {
      this.currentPlace = value;
    });
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
    this.dialog.open(LoginComponent, {});
  }

}
