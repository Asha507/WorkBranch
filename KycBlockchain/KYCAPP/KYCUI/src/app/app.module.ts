import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {FormsModule} from '@angular/forms';
import{RouterModule,Routes} from '@angular/router'
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { IndexComponent } from './index/index.component';
import {DefaultComponent} from './default/default.component';
import { DemoComponent } from './demo/demo.component'
import { InsuranceModule } from './insurance/insurance.module';
const routes:Routes=[
  { path: '',component:DefaultComponent },
  {path:'default',component:DefaultComponent},
  {path:'home',component:HomeComponent},
   {path:'demo',component:DemoComponent},
  {path: 'insurance', loadChildren: 'app/insurance/insurance.module#InsuranceModule'},
  // {path:'Insurance',component:InvestmentsComponent},
 ];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    IndexComponent,
    DefaultComponent,
    DemoComponent
  ],
  imports: [
    BrowserModule, 
    RouterModule.forRoot(routes, {useHash: true}),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
