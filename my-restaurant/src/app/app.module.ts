import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http'
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {LoginService} from './login.service';
import{MenuServiceService} from './menu-service.service'
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { BillingComponent } from './billing/billing.component';
import {TableService} from './table.service';
import { OrdersComponent } from './orders/orders.component';
import { MenuComponent } from './menu/menu.component';
const routes:Routes=[
  { path: '', redirectTo: '/Login', pathMatch: 'full' },
  {path:'Login',component:LoginComponent},
  {path:'Home',component:HomeComponent,children:[
    { path: '', redirectTo: 'Dashboard', pathMatch: 'full' },
    {path:'Dashboard',component:DashboardComponent},
    {path:'Billing',component:BillingComponent},
    {path:'Menu',component:MenuComponent},
    {path:'Order',component:OrdersComponent}
  ]}];

@NgModule({
  
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbComponent,
    BillingComponent,
    OrdersComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpModule,
    BrowserAnimationsModule
  ],
  providers: [LoginService,TableService,MenuServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
