import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Request, Tables } from "../models";
import { Apiservice } from "./api.service";

@Injectable()
export class TableService {
    url: string = environment.api_v1_table;
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
        return this.apiservice.get(this.url + '/floor/' + req['floorId'] + '/table?', new HttpParams({ fromObject: params }));
    }

    get(req: Request): Observable<Response> {
        return this.apiservice.get(this.url + '/floor/' + req['floorId'] + '/table/' + req['id'])
            .pipe(map(data => {
                return data;
            }));
    }
    create(table: Tables): Observable<Response> {
        return this.apiservice.post(this.url + '/floor/' + table.floorId + '/table', table)
            .pipe(map(data => {
                return data;
            }));
    }
    update(table: Tables): Observable<Response> {
        return this.apiservice.put(this.url + '/floor/' + table.floorId + '/table/' + table.id, table)
            .pipe(map(data => {
                return data;
            }));
    }
    delete(id: string): Observable<Response> {
        return this.apiservice.delete(id)
            .pipe(map(data => {
                return data;
            }));
    }
}