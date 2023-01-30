import { Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Bill, BillDetails, BillDetailsService, BillService } from 'src/app/core';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit, OnChanges {

  @Input() tableOrOrder: any;
  table: any;

  @Output() loadTable = new EventEmitter();

  @Output() cancelBill = new EventEmitter();

  billDetails: any = [];

  tableBill: any = [];

  productDetails: { [key: string]: any } = {};

  totalMoney: number = 0;


  constructor(
    private billService: BillService,
    private billServiceDetails: BillDetailsService
  ) { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.tableOrOrder);

    if (this.tableOrOrder == undefined) {
      return;
    } else {
      if (this.tableOrOrder['type'] === 'table') {
        this.clearTempl();
        this.table = { ...this.tableOrOrder };
        this.loadBill()
          .then(() => this.loadProductDetails())
          .then(() => this.loadTableBill())
          .catch(() => this.clickCancelBill());
      }
      if (this.tableOrOrder['type'] === 'order') {
        this.orderLoadToTable()
          .then((product) => this.orderToSerVer(product));
        // .then(() => this.loadTableBill());
      }

    }
  }

  orderLoadToTable() {
    let promise = new Promise((resolve, reject) => {
      let product = this.productDetails[this.tableOrOrder['id']];

      if (product == undefined) {
        product = { ...this.tableOrOrder }

        product['productName'] = product['name'];
        product['productId'] = product['id'];
        product['unitPrice'] = product['price'];
        delete product['id'];

        resolve(product);
      } else {
        product['qty'] = product['qty'] + this.tableOrOrder['qty'];
        resolve(product);
      }
    });
    return promise;
  }
  orderToSerVer(bill_detail: any) {
    let bill_product = this.convertBillDetails(bill_detail);
    if (bill_detail['billId'] == undefined) {
      this.billServiceDetails.create(bill_product).subscribe(
        (data: any) => {
          console.log(data);
          this.productDetails[data.data['productId']] = data.data;
          this.loadTableBill();
          return data;
        },
        err => {
          alert("Order thêm lỗi " + bill_product['productId']);
        }
      );
    } else {
      this.billServiceDetails.update(bill_product).subscribe(
        (data: any) => {
          this.productDetails[data.data['productId']] = data.data;
          this.loadTableBill();
          return data;
        },
        err => {
          alert("Order thêm lỗi " + bill_product['productId']);
        }
      );
    }
  }
  loadBill() {
    let promise = new Promise((resolve, reject) => {
      if (this.tableOrOrder != undefined) {
        this.billService.get(this.tableOrOrder.billTemplId).subscribe(
          (data: any) => {
            this.billDetails = data.data['bill_details'];
            resolve(this.billDetails);
          },
          err => {
            this.clearTempl();
            console.log(err);
            reject(err);
          }
        )
      } else {
        this.clearTempl();
      }
    });
    return promise;
  }

  loadProductDetails() {
    let bill_details: [] = this.billDetails;
    if (this.billDetails != undefined) {
      bill_details.forEach((billDetail: any) => {
        this.productDetails[billDetail['productId']] = billDetail;
      });
    }
  }

  loadTableBill() {
    let keys = Object.keys(this.productDetails);
    this.tableBill = [];
    for (let i = 0; i < keys.length; i++) {
      this.tableBill[i] = this.productDetails[keys[i]];
      let product_detail = { ...this.productDetails[keys[i]] };
      let amount = product_detail['unitPrice'] * product_detail['qty'] * ((100 - product_detail['discount']) / 100);
      this.totalMoney = this.totalMoney + amount;
      console.log(this.totalMoney);

    }

  }

  clearTempl() {
    this.billDetails = [];
    this.tableBill = [];
    this.productDetails = {};
    this.totalMoney = 0;
  }

  convertBillDetails(bill_detail: any) {
    let bill_product: BillDetails | any;
    bill_product = {};
    if (!(bill_detail['id'] == undefined)) {
      bill_product.id = bill_detail['id'];
    }
    bill_product.billId = this.table['billTemplId'];
    bill_product.productId = bill_detail['productId'];
    bill_product.discount = bill_detail['discount'];
    bill_product.intoMoney = bill_detail['unitPrice'] * bill_detail['qty'] * ((100 - bill_detail['discount']) / 100);
    bill_product.productName = bill_detail['productName'];
    bill_product.qty = bill_detail['qty'];
    bill_product.unitPrice = bill_detail['unitPrice'];
    return bill_product;
  }

  deleteProduct(productId: string) {
    if (confirm("Bạn có muốn xóa?") == true) {
      if (this.productDetails[productId]['id'] == undefined) {
        delete this.productDetails[productId];
        this.loadTableBill();
      } else {
        this.billServiceDetails.delete(this.productDetails[productId])
          .subscribe(
            data => {
              alert("Xóa thành công");
              delete this.productDetails[productId];
              this.loadTableBill();
            }, err => {
              console.log(err);
              alert("Lỗi xóa");
            }
          );
      }
    }

  }


  payment() {
    console.log(this.table);

    let bill: Bill = {
      pay: this.totalMoney,
      totalMoney: this.totalMoney,
      id: this.table['billTemplId'],
      discount: 0,
      paymentStatus: "DA_THANH_TOAN",
      table_name: this.table['name'],
    }
    this.billService.update(bill).subscribe(
      (data: any) => {
        alert("Đã thanh toán thành công!");
        let data_out = { ...data.data };
        data_out['table'] = { ...this.table };
        // let load_table = { type: "LOAD_TABLE" };
        this.loadTable.emit(data_out);
      }, err => {
        alert("Thanh toán thất bại");
      }
    )

  }

  clickCancelBill() {
    console.log(this.table);
    let data_out = { ...this.table };
    // let load_table = { type: "LOAD_TABLE" };
    this.cancelBill.emit(data_out);
  }

  printer() {
    const printContents: string | any = document.getElementById('bill-print')?.innerHTML;

    var myWindowPrint = window.open();
    myWindowPrint?.document.write(printContents);
    myWindowPrint?.focus();

    myWindowPrint?.print();
    myWindowPrint?.close();

  }

}
