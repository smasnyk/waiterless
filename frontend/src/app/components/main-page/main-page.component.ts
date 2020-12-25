import {Component, OnInit} from '@angular/core';
import {PlaceService} from "../../services/place.service";
import {FoodPlace} from "../../models/food-place";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  places: FoodPlace[];

  constructor(public placeService: PlaceService) {
  }

  ngOnInit() {
    this.placeService.getPlaces().subscribe(value => this.places = value);
  }

}
