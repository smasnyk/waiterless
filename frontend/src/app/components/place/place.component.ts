import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PlaceService} from "../../services/place.service";
import {FoodPlace} from "../../models/food-place";
import {LoginService} from "../../services/login.service";
import {User} from "../../models/user";
import {Dish} from "../../models/dish";
import {DishService} from "../../services/dish.service";
import {MenuSection} from "../../models/enums/menu-section";
import {PlaceType} from "../../models/enums/place-type";
import {MenuComponent} from "../menu/menu.component";
import {MatDialog} from "@angular/material/dialog";
import {ImageService} from "../../services/image.service";
import {UuidService} from "../../services/uuid.service";

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {
  place: FoodPlace;
  user: User;
  orderStatus: string;
  owner: boolean = false;
  editable: boolean[] = new Array(6);
  newSection: string[] = new Array(2);
  defaultSections = Object.values(MenuSection);
  placeTypes = Object.keys(PlaceType);
  menu: string[] = [];
  dishes: Dish[] = [];
  dish: Dish = new Dish();
  editedDish: Dish = {};
  file: File;

  constructor(public activatedRoute: ActivatedRoute,
              public placeService: PlaceService,
              public loginService: LoginService,
              public dishService: DishService,
              public dialog: MatDialog,
              public uuidService: UuidService,
              public imageService: ImageService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      let id = +params['id'];
      this.placeService.getPlace(id).subscribe(value => this.place = value);
      setTimeout(() => {
        this.menu = Object.values(this.place.menuSections);
        if (this.user != undefined)
          this.dishService.getDishes(this.place).subscribe(value => this.dishes = value);
      }, 500);
      this.isOwner(id);
    });
    this.editable.fill(false);
  }

  isOwner(id: number) {
    if (localStorage.getItem('token') != null) {
      this.loginService.getUser().subscribe(value => this.user = value);
      setTimeout(() => {
        this.owner = this.user.id === id;
      }, 500);
      return this.owner;
    }
  }

  openMenu() {
    this.dialog.open(MenuComponent, {data: {place: this.place, user: this.user}, disableClose: true});
  }

  changeState(i: number) {
    this.editable[i] = !this.editable[i];
  }

  editPlace() {
    this.placeService.editPlace(this.place).subscribe(value => this.place = value);
  }

  saveDish() {
    if (this.dish.price > 0)
      this.dishService.saveDish(this.dish, this.place).subscribe(value => {
        this.dish = value;
        this.dishes.push(this.dish);
      });
  }

  editDish() {
    if (this.editedDish.price > 0)
      this.dishService.editDish(this.editedDish).subscribe(value => this.editedDish = value);
  }

  addSection() {
    let obj = {};
    obj[this.newSection[0]] = this.newSection[1];
    this.placeService.addMenuSection(this.place, obj).subscribe();
    this.reload();
  }

  addOrderStatus() {
    this.placeService.addOrderStatus(this.place, this.orderStatus).subscribe();
    this.reload();
  }

  onPicUpload(event) {
    this.file = event.target.files[0];
    if (this.file != null) {
      this.place.picture = this.uuidService.generateName(this.file);
      this.imageService.setPlacePicture(this.file, this.place, this.place.picture).subscribe();
    }
    this.reload();
  }

  onDishSave(event) {
    this.file = event.target.files[0];
    if (this.file != null) {
      this.editedDish.picture = this.uuidService.generateName(this.file);
      this.imageService.setDishPicture(this.file, this.editedDish, this.editedDish.picture).subscribe();
    }
    this.reload();
  }

  reload() {
    setTimeout(() => location.reload(), 100);
  }
}
