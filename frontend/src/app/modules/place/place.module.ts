import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PlaceRoutingModule} from './place-routing.module';
import {PlaceComponent} from "../../components/place/place.component";
import {MainPageModule} from "../main-page/main-page.module";
import {MatListModule} from "@angular/material/list";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MenuComponent} from "../../components/menu/menu.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatStepperModule} from "@angular/material/stepper";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    PlaceComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    PlaceRoutingModule,
    MainPageModule,
    MatListModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatCardModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  providers: [MatDatepickerModule],
  entryComponents: [MenuComponent]
})
export class PlaceModule {
}
