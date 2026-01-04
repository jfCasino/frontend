import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { NakupovalniSeznam } from '../models/seznam';
import { Observable } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { Artikel } from '../models/artikel';

@Injectable()
export class SeznamiService {

    private headers = new HttpHeaders({'Content-Type': 'application/json'});
    private url = 'http://localhost:8080/v1/seznami';

    constructor(private http: HttpClient) {
    }

    getSeznami(): Observable<NakupovalniSeznam[]> {
        return this.http.get<NakupovalniSeznam[]>(this.url)
                        .pipe(catchError(this.handleError));
    }

    getSeznam(id: number): Observable<NakupovalniSeznam> {
        const url = `${this.url}/${id}`;
        return this.http.get<NakupovalniSeznam>(url)
                        .pipe(catchError(this.handleError));
    }

    delete(id: number): Observable<number> {
        const url = `${this.url}/${id}`;
        return this.http.delete<number>(url, {headers: this.headers})
                        .pipe(catchError(this.handleError));
    }

    create(seznamId: number, artikel: Artikel): Observable<Artikel> {
        return this.http.post<Artikel>(this.url + '/' + seznamId + '/artikli', JSON.stringify(artikel), {headers: this.headers})
                        .pipe(catchError(this.handleError));
    }

    private handleError(error: any): Promise<any> {
        console.error('Prišlo je do napake', error);
        return Promise.reject(error.message || error);
    }
}

