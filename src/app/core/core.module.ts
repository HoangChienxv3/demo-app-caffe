import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Apiservice, BillDetailsService, BillService, CatergoryService, FloorService, ProductService, TableService } from './service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    Apiservice,
    TableService,
    FloorService,
    ProductService,
    CatergoryService,
    BillService,
    BillDetailsService
  ]
})
export class CoreModule { }
