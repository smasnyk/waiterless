import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PlaceComponent} from "../../components/place/place.component";
import {OrderComponent} from "../../components/order/order.component";
import {StatisticsComponent} from "../../components/statistics/statistics.component";


const routes: Routes = [
  {
    path: '', component: PlaceComponent,
    children: [
      {path: 'orders', component: OrderComponent},
      {path: 'stats', component: StatisticsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaceRoutingModule {
}
