import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { BetResponse, WalletResponse } from '../models/stats';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private baseUrl = environment.statsServiceUrl || 'http://localhost:8082/stats';

  constructor(private http: HttpClient) { }

  /** Retrieve a user's bet statistics */
  getBetStatistics(userId: string, order: string = 'asc', limit: number = 10): Observable<BetResponse[]> {
    const url = `${this.baseUrl}/bets/${userId}?order=${order}&limit=${limit}`;
    return this.http.get<BetResponse[]>(url)
      .pipe(catchError(this.handleError));
  }

  /** Retrieve the full leaderboard */
  getLeaderboard(order: string = 'desc', limit: number = 10): Observable<WalletResponse[]> {
    const url = `${this.baseUrl}/leaderboard?order=${order}&limit=${limit}`;
    return this.http.get<WalletResponse[]>(url)
      .pipe(catchError(this.handleError));
  }

  /** Retrieve the top 5 wallets in the leaderboard */
  getLeaderboardTop5(): Observable<WalletResponse[]> {
    const url = `${this.baseUrl}/leaderboard/top5`;
    return this.http.get<WalletResponse[]>(url)
      .pipe(catchError(this.handleError));
  }

  /** Common error handler */
  private handleError(error: any): Promise<any> {
    console.error('Statistics API error', error);
    return Promise.reject(error.message || error);
  }

}
