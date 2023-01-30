import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { BillComponent } from './bill/bill.component';
import { ProductComponent } from './product/product.component';
import { ShoppAppComponent } from './shopp-app.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ShoppAppComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ], 
  exports:[
    RouterModule
  ]
})
export class ShoppAppRoutingModule { }
