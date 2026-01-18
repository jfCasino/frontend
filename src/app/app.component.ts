import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WalletService } from './seznami/services/wallet.service';
import { WalletResponse } from './seznami/models/wallet';

@Component({
  selector: 'prpo-app',
  template: `
    <div class="app-container">
    <h1>{{ naslov }}</h1>

      <!-- Wallet always visible -->
  <div class="wallet-container" *ngIf="wallet">
    <h2>Wallet Balance</h2>
    <p>User ID: {{ wallet.userID }}</p>
    <p>Balance: {{ wallet.balance | currency:'EUR':'symbol' }}</p>
  </div>

    <div class="buttons">
        <button (click)="goToRoulette()">Go to Roulette</button>
        <button (click)="goToStats()">Go to Stats</button>
    </div>

    <img *ngIf="showHomeImage" src="../assets/photo.webp" alt="Casino Image" class="home-image">

<router-outlet (activate)="onWalletUpdatedIfRoulette($event)"></router-outlet>
    </div>
  `,
  styles: [`
    /* Main wrapper to center all content */
    .app-container {
      display: flex;
      flex-direction: column;
      align-items: center;      /* Horizontal center */
      justify-content: flex-start; /* Top vertical alignment, change to 'center' if you want vertical centering */
      min-height: 100vh;
      padding: 20px;
      background-color: #fdf5e6; /* Soothing beige */
      box-sizing: border-box;
      text-align: center;
    }

    /* Wallet box */
    .wallet-container {
      border: 1px solid #e0d8c3;
      background-color: #fff8f0;
      padding: 20px;
      width: 320px;
      margin-bottom: 20px;
      border-radius: 15px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    }

    /* Buttons container */
    .buttons {
      display: flex;
      gap: 16px;   /* space between buttons */
      margin-bottom: 20px;
    }

    /* Individual buttons */
    .buttons button {
      padding: 10px 20px;
      font-size: 16px;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      background-color: #e6d8b0;
      color: #333;
      transition: background-color 0.2s ease, transform 0.1s ease;
    }

    .buttons button:hover {
      background-color: #d8c39e;
      transform: translateY(-2px);
    }

    .buttons button:active {
      transform: translateY(1px);
    }
  `]
})
export class AppComponent implements OnInit {
  naslov = 'jfCasino';
  wallet: WalletResponse | null = null;

showHomeImage = true; // <-- controls the image visibility

  constructor(private walletService: WalletService, private router: Router) {}

  ngOnInit(): void {
    // Fetch wallet for mock_user_1
    this.walletService.getWallet('mock_user_1').subscribe(
      data => this.wallet = data,
      error => console.error('Error fetching wallet', error)
    );
  }

  goToRoulette() {
    this.showHomeImage = false; // hide image when navigating
    if (this.router.url === '/roulette') {
      this.router.navigate(['/']);
      this.showHomeImage = true; // show again if going back
    } else {
      this.router.navigate(['/roulette']);
    }
  }

  goToStats() {
    this.showHomeImage = false; // hide image when navigating
    if (this.router.url === '/stats') {
      this.router.navigate(['/']);
      this.showHomeImage = true; // show again if going back
    } else {
      this.router.navigate(['/stats']);
    }
  }

      // Fetch wallet data
  loadWallet() {
    this.walletService.getWallet('mock_user_1').subscribe(
      data => this.wallet = data,
      error => console.error('Error fetching wallet', error)
    );
  }

      // This method will be called when RouletteComponent emits event
  onWalletUpdated() {
    this.loadWallet();
  }

  onWalletUpdatedIfRoulette(componentRef: any) {
  // Only subscribe if it's RouletteComponent
  if (componentRef.walletUpdated) {
    componentRef.walletUpdated.subscribe(() => this.onWalletUpdated());
  }
}
}
