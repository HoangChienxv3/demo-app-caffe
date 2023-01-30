import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { BillComponent } from './bill/bill.component';
import { ProductComponent } from './product/product.component';
import { ShoppAppComponent } from './shopp-app.component';
import { ShoppAppRoutingModule } from './shopp-app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductOrderComponent } from './product/product-order/product-order.component';

@NgModule({
  declarations: [

    TableComponent,
    BillComponent,
    ProductComponent,
    ShoppAppComponent,
    ProductOrderComponent
  ],
  imports: [
    CommonModule,
    ShoppAppRoutingModule,
    ReactiveFormsModule
  ]
})
export class ShoppAppModule { }
