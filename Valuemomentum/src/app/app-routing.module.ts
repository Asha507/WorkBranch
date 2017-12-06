import { NgModule } from '@angular/core';
import{RouterModule,Routes} from '@angular/router'
import {LoginComponent} from './login/login.component'
import{HomeComponent} from './home/home.component';
import {NewsComponent} from './news/news.component';

const routes:Routes=[
  { path: '', redirectTo: '/Login', pathMatch: 'full' },
  {path:'Login',component:LoginComponent},
  {path:'News',component:NewsComponent},
  {path:'Home',component:HomeComponent}];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
