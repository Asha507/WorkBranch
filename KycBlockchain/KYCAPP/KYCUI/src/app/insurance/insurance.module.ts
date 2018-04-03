import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import {FormsModule} from '@angular/forms';;
import { InsuranceHomeComponent } from './insurance-home/insurance-home.component';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { InsuranceLayoutComponent } from './insurance-layout/insurance-layout.component';
import { ShopComponent } from './shop/shop.component';
import { CarShopComponent } from './car-shop/car-shop.component';
import { PhoneShopComponent } from './phone-shop/phone-shop.component';
import { InsureComponent } from './insure/insure.component';
import { MyDatePickerModule } from 'mydatepicker';
import { SummaryComponent } from './summary/summary.component';
import { ShopService } from './shop.service';
import { HttpModule } from '@angular/http';
import { BlockService } from './block.service';
import { PaymentComponent } from './payment/payment.component';
import { SelfServiceComponent } from './self-service/self-service.component';
import { LoginService } from './login.service';
import { ContractsComponent } from './contracts/contracts.component';

const routes: Routes = [
  {
    path: '', component: InsuranceLayoutComponent,
    children: [
      { path: '', component: InsuranceHomeComponent },
      { path: 'insurancehome', component: InsuranceHomeComponent },
      { path: 'shop', component: ShopComponent },
      { path: 'shop/car-shop', component: CarShopComponent },
      { path: 'shop/phone-shop', component: PhoneShopComponent },
      { path: 'shop/car-shop/insure', component: InsureComponent },
      { path: 'shop/car-shop/payment', component:PaymentComponent },
      { path: 'shop/car-shop/summary', component:SummaryComponent },
      { path: 'self-service', component:SelfServiceComponent },
      { path: 'self-service/contracts', component:ContractsComponent }
    ]
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MyDatePickerModule,
    HttpModule
  ],
  providers:[ShopService,BlockService,LoginService],
  declarations: [InsuranceHomeComponent, InsuranceLayoutComponent, ShopComponent, CarShopComponent, PhoneShopComponent, InsureComponent, SummaryComponent, PaymentComponent, SelfServiceComponent, ContractsComponent]
})
export class InsuranceModule { }
