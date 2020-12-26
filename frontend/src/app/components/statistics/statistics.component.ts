import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {EventService} from "../../services/event.service";
import {ClientService} from "../../services/client.service";
import {PlaceService} from "../../services/place.service";
import {User} from "../../models/user";
import {FoodPlace} from "../../models/food-place";
import {Role} from "../../models/enums/role";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {formatDate} from "@angular/common";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter
} from "@angular/material-moment-adapter";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  providers: [{
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
  }, {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}, {provide: MAT_DATE_LOCALE, useValue: 'uk-UKR'}]
})

export class StatisticsComponent implements OnInit, AfterViewInit {
  user: User;
  place: FoodPlace;
  selected: number;
  section: string;
  date: string;
  places: FoodPlace[];
  roles = Object.values(Role);
  dataSource = new MatTableDataSource();
  displayed: string[] = ['name', 'quantity'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private eventEmitter: EventService,
              public clientService: ClientService,
              public placeService: PlaceService) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.eventEmitter.user.subscribe(value => this.user = value);
      if (this.user.role === this.roles[0]) {
        this.placeService.getPlaces().subscribe(value => this.places = value);
        this.userStats();
      } else if (this.user.role === this.roles[1]) {
        this.placeStats();
        this.place = this.user;
      }
    }, 500);
  }

  ngAfterViewInit() {
    this.dataSource.sortingDataAccessor = (item) => {
      return item[1];
    }
    this.dataSource.sort = this.sort;
  }

  userStats() {
    this.selected = undefined;
    this.clientService.getStats(this.user).subscribe(value => this.dataSource.data = Object.entries(value));
  }

  userFilteredStats() {
    this.clientService.getStats(this.user, this.selected).subscribe(value => this.dataSource.data = Object.entries(value));
  }

  placeStats() {
    this.section = undefined;
    this.date = undefined;
    this.placeService.getStats(this.user).subscribe(value => this.dataSource.data = Object.entries(value));
  }

  placeFilteredStats() {
    if (this.date)
      this.date = formatDate(this.date, 'yyyy-MM-dd', 'en-US');
    this.placeService.getStats(this.place, this.section, this.date).subscribe(value => this.dataSource.data = Object.entries(value));
  }
}
