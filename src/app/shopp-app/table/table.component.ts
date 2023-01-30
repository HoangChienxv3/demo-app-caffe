import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Bill, BillService, FloorService, Request, Response, Tables, TableService } from 'src/app/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges {

  @Input() tableIn: any;

  @Output() selectTable = new EventEmitter();

  table_select: Tables | any;

  floorList: any = [];
  tableList: any = [];
  selectFloorFrom: FormGroup | any;
  indexFloor: 0 | any;


  constructor(
    private tableService: TableService,
    private floorService: FloorService,
    private billService: BillService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.tableIn == undefined) {
      return;
    } else {
      console.log(this.tableIn);

      if (this.tableIn['type'] === 'load_table') {
        this.updateTablePayment()
          .then(() => this.onChangeFloor());
      }
      if (this.tableIn['type'] === 'cancel_bill') {
        this.updateTableCancel()
          .then(() => this.onChangeFloor());
      }
    }
  }

  ngOnInit(): void {

    this.getListTablePromise();
    this.selectFloorFrom = new FormGroup({
      selectFloor: new FormControl('')
    });

  }

  updateTablePayment() {
    let promise = new Promise((resolve, reject) => {
      let table_update: Tables = {
        id: this.tableIn['table']['id'],
        floorId: this.tableIn['table']['floorId'],
        billTemplId: ''
      }
      this.tableService.update(table_update).subscribe(
        data => {
          console.log(data);
          resolve(data);
        },
        err => {
          alert("lỗi update table (table-component)");
          reject(err);
        }
      )
    });
    return promise;
  }

  updateTableCancel() {
    let promise = new Promise((resolve, reject) => {
      let table_update: Tables = {
        id: this.tableIn['id'],
        floorId: this.tableIn['floorId'],
        billTemplId: ''
      }
      this.tableService.update(table_update).subscribe(
        data => {
          console.log(data);
          resolve(data);
        },
        err => {
          alert("lỗi update table cancel (table-component)");
          reject(err);
        }
      )
    });
    return promise;
  }

  getListTablePromise() {
    let promise = new Promise((resolve, reject) => {
      this.floorService.get("").subscribe(
        (res: Response | any) => {
          this.floorList = res.data;
          resolve(this.floorList);
        },
        err => {
          alert("Load Table thất bại!");
          console.log(err);
          reject(err);
        }
      )
    });
    return promise;
  }

  onChangeFloor() {
    if (this.selectFloorFrom.value.selectFloor === '') {
      this.tableList = [];
    } else {
      let req: any = {};
      req['floorId'] = this.floorList[this.selectFloorFrom.value.selectFloor]['id'];
      req['id'] = '';
      this.tableService.get(req).subscribe((data: any) => {
        this.tableList = data.data;
      });
    }

  }

  bookTable() {
    this.createBill()
      .then(bill => this.tableWithPeopleSitting())
      .then(() => this.cancelTablePopup());
  }

  createBill() {
    let bill: Bill = {
      totalMoney: 0,
      discount: 0,
      pay: 0,
      paymentStatus: "false",
      table_name: this.table_select['name']
    }
    let promise = new Promise((resolve, reject) => {
      this.billService.create(bill).subscribe(
        (data: any) => {
          console.log(data.data);
          this.table_select['billTemplId'] = data.data['id'];
          resolve(data.data);
        },
        err => {
          alert("Tạo hóa đơn thất bại");
          reject(err);
        }
      )
    });
    return promise;
  }

  tableWithPeopleSitting() {
    let table_update: Tables = { ...this.table_select };
    this.tableService.update(table_update).subscribe(
      (data: any) => {
        console.log(data);
        this.selectTable.emit(data.data);
        this.onChangeFloor();
      },
      err => {
        alert("Update table chỗ ngồi lỗi!");
      }
    )

  }

  cancelTablePopup() {
    var poup = document.getElementById("popUp_empty");
    poup?.classList.toggle("show");
  }

  clickTable(table: any) {
    this.table_select = table;
    console.log(this.table_select);

    if (table.billTemplId == '') {
      var poup = document.getElementById("popUp_empty");
      poup?.classList.toggle("show");

    } else {
      this.selectTable.emit(table);
    }

  }
}
