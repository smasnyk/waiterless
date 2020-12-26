import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientComponent} from "../../components/client/client.component";
import {OrderComponent} from "../../components/order/order.component";
import {StatisticsComponent} from "../../components/statistics/statistics.component";


const routes: Routes = [
  {
    path: '', component: ClientComponent,
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
export class ClientRoutingModule {
}
