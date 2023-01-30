import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CatergoryService } from 'src/app/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  selectCategoryFrom: FormGroup | any;
  categoryList: any = [];
  productList: any = [];
  @Output() orderBill = new EventEmitter();

  constructor(
    private categoryService: CatergoryService
  ) { }

  ngOnInit(): void {

    this.getListCategoryPromise();

    this.selectCategoryFrom = new FormGroup({
      selectCategory: new FormControl('')
    });
  }

  getListCategoryPromise() {
    let promise = new Promise((resolve, reject) => {
      this.categoryService.get("").subscribe(
        (res: Response | any) => {
          this.categoryList = res.data;
          resolve(this.categoryList);
        },
        err => {
          console.log(err);
          reject(err);
        }
      )
    });
    return promise;
  }

  onChangeCategory() {
    if (this.selectCategoryFrom.value.selectCategory === '') {
      this.productList = [];
    } else {
      this.productList = this.categoryList[this.selectCategoryFrom.value.selectCategory]['products'];
    }
  }

  orderProduct(orderProduct: any) {
    this.orderBill.emit(orderProduct);
  }

}
