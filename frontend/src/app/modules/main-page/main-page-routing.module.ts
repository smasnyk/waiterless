import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainPageComponent} from "../../components/main-page/main-page.component";
import {LoginComponent} from "../../components/login/login.component";
import {RegistrationComponent} from "../../components/registration/registration.component";


const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'user/:id', loadChildren: () => import("../client/client.module").then(u => u.ClientModule)},
  {path: 'place/:id', loadChildren: () => import("../place/place.module").then(p => p.PlaceModule)},
  {path: 'admin/users', loadChildren: () => import("../admin/admin.module").then(a => a.AdminModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPageRoutingModule {
}
