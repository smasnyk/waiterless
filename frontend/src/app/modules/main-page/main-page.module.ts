import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainPageRoutingModule} from './main-page-routing.module';
import {RegistrationComponent} from "../../components/registration/registration.component";
import {LoginComponent} from "../../components/login/login.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MainPageComponent} from "../../components/main-page/main-page.component";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatRadioModule} from "@angular/material/radio";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {HeaderComponent} from "../../components/header/header.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatBadgeModule} from "@angular/material/badge";
import {MatTooltipModule} from "@angular/material/tooltip";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {OrderComponent} from "../../components/order/order.component";
import {StatisticsComponent} from "../../components/statistics/statistics.component";


@NgModule({
  declarations: [
    RegistrationComponent,
    LoginComponent,
    MainPageComponent,
    HeaderComponent,
    OrderComponent,
    StatisticsComponent
  ],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    MatDialogModule,
    MatSelectModule,
    FormsModule,
    MatRadioModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatTooltipModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatTableModule,
    MatSortModule,
    MatDatepickerModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent
  ],
  entryComponents: [RegistrationComponent, LoginComponent]
})
export class MainPageModule {
}
