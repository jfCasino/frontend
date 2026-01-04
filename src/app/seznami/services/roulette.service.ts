import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { MultiBetRequest, MultiBetResponse, SingleBetRequest } from '../models/roulette';


@Injectable({
  providedIn: 'root'
})
export class RouletteService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private baseUrl = environment.rouletteServiceUrl || 'http://localhost:8080/rulette';

  constructor(private http: HttpClient) { }

  /** Place multiple bets for a roulette spin */
  placeBet(request: MultiBetRequest): Observable<MultiBetResponse> {
    return this.http.post<MultiBetResponse>(`${this.baseUrl}/bet`, JSON.stringify(request), { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  /** Retrieve a paginated list of bets */
  getBets(order: string = 'asc', limit: number = 10): Observable<MultiBetResponse[]> {
    const url = `${this.baseUrl}/bets?order=${order}&limit=${limit}`;
    return this.http.get<MultiBetResponse[]>(url)
      .pipe(catchError(this.handleError));
  }

  /** Common error handler */
  private handleError(error: any): Promise<any> {
    console.error('Roulette API error', error);
    return Promise.reject(error.message || error);
  }

}
