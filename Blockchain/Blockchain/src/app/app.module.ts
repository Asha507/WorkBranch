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
const routes:Routes=[
  { path: '',component:HomeComponent },
  {path:'Shop',component:ShopComponent},
  {path:'Shop/CarShop',component:CarShopComponent},
  {path:'Shop/PhoneShop',component:PhoneShopComponent}
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
    PhoneShopComponent
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
