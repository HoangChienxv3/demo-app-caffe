import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";

@Injectable()
export class Apiservice {
    constructor(
        private http: HttpClient
    ) { }

    private formatErrors(error: any) {
        return throwError(() => error.error);
    }

    get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        return this.http.get(`${path}`, { params })
            .pipe(catchError(this.formatErrors));
    }

    put(path: string, body: object = {}): Observable<any> {
        return this.http.put(`${path}`, body)
            .pipe(catchError(this.formatErrors));
    }

    post(path: string, body: object = {}): Observable<any> {
        return this.http.post(`${path}`, body)
            .pipe(catchError(this.formatErrors));
    }

    delete(path: string): Observable<any> {
        return this.http.delete(`${path}`)
            .pipe(catchError(this.formatErrors));
    }



}