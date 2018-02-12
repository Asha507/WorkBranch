import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{RouterModule,Routes} from '@angular/router'
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {LoginService} from './login.service';
import {HttpModule} from '@angular/http';
import { HeaderComponent } from './header/header.component';
import { InvestmentsComponent } from './investments/investments.component';
import {InvestmentService} from './services/investment.service';
import { CustomFormsModule } from 'ng2-validation';
import { Ng2FileRequiredModule } from 'ng2-file-required';
import { MenuComponent } from './menu/menu.component';
import { AdminComponent } from './admin/admin.component';
const routes:Routes=[
  { path: '', redirectTo: '/Investment', pathMatch: 'full' },
  {path:'Admin',component:AdminComponent},
  {path:'Investment',component:InvestmentsComponent},
 ];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    InvestmentsComponent,
    MenuComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CustomFormsModule,
    RouterModule.forRoot(routes),
    HttpModule,
    Ng2FileRequiredModule
  ],
  providers: [LoginService,InvestmentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
