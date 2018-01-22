import { NgModule } from '@angular/core';
import{RouterModule,Routes} from '@angular/router'
import {LoginComponent} from './login/login.component'
import{HomeComponent} from './home/home.component';
import {NewsComponent} from './news/news.component';
import {LearningComponent} from './learning/learning.component'
const routes:Routes=[
  { path: '', redirectTo: '/Login', pathMatch: 'full' },
  {path:'Login',component:LoginComponent},
  {path:'Home',component:HomeComponent},
  {path:'Learning',component:LearningComponent}];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
