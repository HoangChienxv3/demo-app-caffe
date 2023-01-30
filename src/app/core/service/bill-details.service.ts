import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { BillDetails, Request } from "../models";
import { Apiservice } from "./api.service";

@Injectable()
export class BillDetailsService {
    url: string = environment.api_v1_bill;
    constructor(
        private apiservice: Apiservice
    ) { }

    query(req: Request): Observable<Response> {
        const params: any = {};
        type keyType = keyof typeof req;
        Object.keys(req).forEach((key) => {
            if (req[key as keyType] != '' || req[key as keyType] != undefined) {
                params[key] = req[key as keyType];
            }
        });
        return this.apiservice.get(this.url + '/bill/' + req['billId'] + '/bill_detail?', new HttpParams({ fromObject: params }));
    }

    get(req: Request): Observable<Response> {
        return this.apiservice.get(this.url + '/bill/' + req['billId'] + '/bill_detail/' + req['id'])
            .pipe(map(data => {
                return data;
            }));
    }
    create(billDetails: BillDetails): Observable<Response> {
        return this.apiservice.post(this.url + '/bill/' + billDetails.billId + '/bill_detail', billDetails)
            .pipe(map(data => {
                return data;
            }));
    }
    update(billDetails: BillDetails): Observable<Response> {
        return this.apiservice.put(this.url + '/bill/' + billDetails.billId + '/bill_detail/' + billDetails.id, billDetails)
            .pipe(map(data => {
                return data;
            }));
    }
    delete(billDetails: any): Observable<Response> {
        return this.apiservice.delete(this.url + '/bill/' + billDetails.billId + '/bill_detail/' + billDetails.id)
            .pipe(map(data => {
                return data;
            }));
    }
}