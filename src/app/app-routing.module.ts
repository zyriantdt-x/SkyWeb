import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './components/client/client.component';

import { LoginComponent } from "./components/login/login.component";
import { MeComponent } from './components/me/me.component';
import { StaffComponent } from './components/staff/staff.component';
import { DashboardComponent } from "./_layouts/dashboard/dashboard.component";
import { SiteComponent } from "./_layouts/site/site.component";

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  {
    path: "",
    component: SiteComponent,
    children: [
      { path: "login", component: LoginComponent },
    ]
  },
  { path: "me", component: MeComponent },
  { path: "client", component: ClientComponent },
  { path: "staff", component: StaffComponent },

  /*{
    path: "",
    component: DashboardComponent,
    children: [
      { path: "me", component: MeComponent }
    ]
  },*/
  { path: "**", redirectTo: "/login", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
