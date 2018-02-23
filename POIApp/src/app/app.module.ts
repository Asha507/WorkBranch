import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{RouterModule,Routes} from '@angular/router'
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import { HeaderComponent } from './header/header.component';
import { InvestmentsComponent } from './investments/investments.component';
import {InvestmentService} from './services/investment.service';
import { CustomFormsModule } from 'ng2-validation';
import { MenuComponent } from './menu/menu.component';
import { AdminComponent } from './admin/admin.component';
import {DataTableModule} from "angular2-datatable";
import {AdminService} from './services/admin.service';
import { DataFilterPipe } from './data-filter.pipe';
import { StatusComponent } from './status/status.component'
import { StatusService } from './services/status.service';
import { MenuService } from './services/menu.service';
const routes:Routes=[
  { path: '', redirectTo: '/Investment', pathMatch: 'full' },
  {path:'Admin',component:AdminComponent},
  {path:'Status',component:StatusComponent},
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
    AdminComponent,
    DataFilterPipe,
    StatusComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CustomFormsModule,
    RouterModule.forRoot(routes, {useHash: true}),
    HttpModule,
    DataTableModule
  ],
  providers: [InvestmentService,AdminService,StatusService,MenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
