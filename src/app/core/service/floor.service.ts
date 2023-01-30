import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Bill, Floor } from "../models";
import { Apiservice } from "./api.service";

@Injectable()
export class FloorService {
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
        return this.apiservice.get(this.url + '/floor?', new HttpParams({ fromObject: params }));
    }

    get(id: string): Observable<Response> {
        return this.apiservice.get(this.url + '/floor/' + id)
            .pipe(map(data => {
                return data;
            }));
    }
    create(floor: Floor): Observable<Response> {
        return this.apiservice.post(this.url + '/floor', floor)
            .pipe(map(data => {
                return data;
            }));
    }
    update(floor: Floor): Observable<Response> {
        return this.apiservice.put(this.url + '/floor/' + floor.id, floor)
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