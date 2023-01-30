import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopp-app',
  templateUrl: './shopp-app.component.html',
  styleUrls: ['./shopp-app.component.css']
})
export class ShoppAppComponent implements OnInit {

  viewBill: any | '';
  tableData: any | '';
  orderToBill: any | '';

  tableOrOrderToBill: any | '';

  loadTable: any | '';

  constructor() { }

  ngOnInit(): void {
  }

  getTableData(value: any) {
    // this.tableData = value;
    this.tableOrOrderToBill = value;
    this.tableOrOrderToBill['type'] = 'table'
  }

  orderBill(orderBill: any) {
    // this.orderToBill = orderBill;
    this.tableOrOrderToBill = orderBill;
    this.tableOrOrderToBill['type'] = 'order'
  }

  sendToLoadTable(load_table: any) {
    this.loadTable = load_table;
    this.loadTable['type'] = 'load_table';

  }

  cancelBillToTable(cancelBill: any) {
    this.loadTable = cancelBill;
    this.loadTable['type'] = 'cancel_bill';
  }

}
