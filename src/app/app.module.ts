import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './_layouts/dashboard/dashboard.component';
import { SiteComponent } from './_layouts/site/site.component';

import { MeComponent } from './components/me/me.component';
import { ClientComponent } from './components/client/client.component';
import { StaffComponent } from './components/staff/staff.component';

import { authInterceptorProviders } from "./_helpers/auth.interceptor";
import { RegisterComponent } from './components/register/register.component';
import { StoreComponent } from './components/store/store.component';
import { LeaderboardsComponent } from './components/leaderboards/leaderboards.component';
import { OnlineComponent } from './components/online/online.component';
import { SkyClientComponent } from './components/sky-client/sky-client.component';
import { SkyClientTokenComponent } from './components/sky-client-token/sky-client-token.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SiteComponent,
    MeComponent,
    ClientComponent,
    StaffComponent,
    RegisterComponent,
    StoreComponent,
    LeaderboardsComponent,
    OnlineComponent,
    SkyClientComponent,
    SkyClientTokenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    authInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
