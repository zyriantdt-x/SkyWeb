import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './components/client/client.component';
import { LeaderboardsComponent } from './components/leaderboards/leaderboards.component';

import { LoginComponent } from "./components/login/login.component";
import { MeComponent } from './components/me/me.component';
import { OnlineComponent } from './components/online/online.component';
import { RegisterComponent } from './components/register/register.component';
import { SkyClientTokenComponent } from './components/sky-client-token/sky-client-token.component';
import { SkyClientComponent } from './components/sky-client/sky-client.component';
import { StaffComponent } from './components/staff/staff.component';
import { StoreComponent } from './components/store/store.component';
import { AuthGuard } from './_helpers/auth.guard';
import { DashboardComponent } from "./_layouts/dashboard/dashboard.component";
import { SiteComponent } from "./_layouts/site/site.component";

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  {
    path: "",
    component: SiteComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent }
    ]
  },
  
  { path: "me", component: MeComponent, canActivate: [AuthGuard] },
  { path: "client", component: ClientComponent, canActivate: [AuthGuard] },
  { path: "staff", component: StaffComponent, canActivate: [AuthGuard] },

  { path: "skyclient", component: SkyClientTokenComponent, canActivate: [AuthGuard] }, // skyclient route
  { path: "skyclient/:token", component: SkyClientComponent }, // skyclient route

  { path: "leaderboards", component: LeaderboardsComponent, canActivate: [AuthGuard] },
  { path: "online", component: OnlineComponent, canActivate: [AuthGuard] },
  { path: "store", component: StoreComponent, canActivate: [AuthGuard] },

  { path: "**", redirectTo: "/login", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
