import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

// Import or define models
import { WalletResponse, CreateWalletRequest } from '../models/wallet';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private baseUrl = environment.walletServiceUrl || 'http://localhost:8081/wallets';

  // Reactive wallet state
  private walletSubject = new BehaviorSubject<WalletResponse | null>(null);
  public wallet$ = this.walletSubject.asObservable(); // Expose as Observable

  constructor(private http: HttpClient) { }

  /** Create a new wallet for a user */
  createWallet(request: CreateWalletRequest): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/create`, JSON.stringify(request), { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  /** Retrieve a user's wallet by userID and update BehaviorSubject */
  getWallet(userID: string): Observable<WalletResponse> {
    return this.http.get<WalletResponse>(`${this.baseUrl}/${userID}`, { headers: this.headers })
      .pipe(
        tap(wallet => this.walletSubject.next(wallet)), // update reactive wallet
        catchError(this.handleError)
      );
  }

  /** Manually update wallet (optional) */
  setWallet(wallet: WalletResponse) {
    this.walletSubject.next(wallet);
  }

  /** Retrieve a list of wallets with optional order and limit */
  getAllWallets(order: string = 'asc', limit: number = 10): Observable<WalletResponse[]> {
    const url = `${this.baseUrl}?order=${order}&limit=${limit}`;
    return this.http.get<WalletResponse[]>(url)
      .pipe(catchError(this.handleError));
  }

  /** Common error handler */
  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(() => error);
  }

}
