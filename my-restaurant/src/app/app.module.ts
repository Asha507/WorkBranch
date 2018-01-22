import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http'
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {LoginService} from './login.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
const routes:Routes=[
  { path: '', redirectTo: '/Dashboard', pathMatch: 'full' },
  {path:'Login',component:LoginComponent},
  {path:'Dashboard',component:DashboardComponent}];

@NgModule({
  
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpModule,
    BrowserAnimationsModule
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
