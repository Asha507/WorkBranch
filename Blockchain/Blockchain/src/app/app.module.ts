import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import{RouterModule,Routes} from '@angular/router'
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { HeaderComponent } from './header/header.component';
import { CarShopComponent } from './car-shop/car-shop.component';
import { PhoneShopComponent } from './phone-shop/phone-shop.component';
import { InsuranceComponent } from './insurance/insurance.component';
import { BlockexplorerComponent } from './blockexplorer/blockexplorer.component';
import { BikeInsurancComponent } from './bike-insuranc/bike-insuranc.component';
import { BikeInsuranceComponent } from './bike-insurance/bike-insurance.component';
const routes:Routes=[
  { path: '',component:HomeComponent },
  {path:'shop',component:ShopComponent},
  {path:'shop/car-shop',component:CarShopComponent},
  {path:'shop/phone-shop',component:PhoneShopComponent}
  // {path:'RepairShop',component:StatusComponent},
  // {path:'Insurance',component:InvestmentsComponent},
 ];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShopComponent,
    HeaderComponent,
    CarShopComponent,
    PhoneShopComponent,
    InsuranceComponent,
    BlockexplorerComponent,
    BikeInsurancComponent,
    BikeInsuranceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes, {useHash: true}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
