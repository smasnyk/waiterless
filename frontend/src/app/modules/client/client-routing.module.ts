import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientComponent} from "../../components/client/client.component";
import {OrderComponent} from "../../components/order/order.component";


const routes: Routes = [
  {
    path: '', component: ClientComponent,
    children: [
      {path: 'orders', component: OrderComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {
}
