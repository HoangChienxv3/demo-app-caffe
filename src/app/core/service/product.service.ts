import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Product, Request } from "../models";
import { Apiservice } from "./api.service";

@Injectable()
export class ProductService {
    url: string = environment.api_v1_product;
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
        return this.apiservice.get(this.url + '/category/' + req['categoryId'] + '/product?', new HttpParams({ fromObject: params }));
    }

    get(req: Request): Observable<Response> {
        return this.apiservice.get(this.url + '/category/' + req['categoryId'] + '/product/' + req['id'])
            .pipe(map(data => {
                return data;
            }));
    }
    create(product: Product): Observable<Response> {
        return this.apiservice.post(this.url + '/category/' + product.categoryId + '/product', product)
            .pipe(map(data => {
                return data;
            }));
    }
    update(product: Product): Observable<Response> {
        return this.apiservice.put(this.url + '/category/' + product.categoryId + '/product/' + product.id, product)
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