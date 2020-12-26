import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PlaceRoutingModule} from './place-routing.module';
import {PlaceComponent} from "../../components/place/place.component";
import {MainPageModule} from "../main-page/main-page.module";
import {MatListModule} from "@angular/material/list";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";


@NgModule({
  declarations: [
    PlaceComponent
  ],
    imports: [
        CommonModule,
        PlaceRoutingModule,
        MainPageModule,
        MatListModule,
        MatSelectModule,
        MatButtonModule,
        FormsModule,
        MatInputModule,
        MatCardModule
    ]
})
export class PlaceModule {
}
