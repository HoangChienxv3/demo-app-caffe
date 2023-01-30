import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-order',
  templateUrl: './product-order.component.html',
  styleUrls: ['./product-order.component.css']
})
export class ProductOrderComponent implements OnInit {

  @Input() product: any;
  qty: number = 0;

  @Output() orderProduct = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  addProduct() {
    this.qty++;
    this.validQty(this.qty);
  }

  minusProduct() {
    this.qty--;
    this.validQty(this.qty);

  }

  resetQty() {
    let qtyIn: any = document.getElementById('qty' + this.product.id);
    qtyIn['value'] = 0;
    this.qty = 0;
  }

  onChangeQty() {
    let qtyIn: any = document.getElementById('qty' + this.product.id);
    if (qtyIn['value'] < 0) {
      qtyIn['value'] = 0;
      this.qty = 0;
    }
  }

  validQty(data: number) {
    if (data < 0) {
      this.qty = 0;
    }
  }

  order() {
    this.product['qty'] = this.qty;
    let data = { ...this.product }
    this.orderProduct.emit(data);
  }

}
