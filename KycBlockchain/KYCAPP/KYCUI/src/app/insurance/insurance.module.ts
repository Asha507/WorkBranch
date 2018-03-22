import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsuranceHomeComponent } from './insurance-home/insurance-home.component';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
const routes:Routes=[
  { path: '',component:InsuranceHomeComponent },
  {path:'home',component:InsuranceHomeComponent},
  // {path:'Insurance',component:InvestmentsComponent},
 ];
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes),
  ],
  
  declarations: [InsuranceHomeComponent]
})
export class InsuranceModule { }
