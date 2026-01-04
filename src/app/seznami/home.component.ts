import { Component, OnInit } from '@angular/core';
import { WalletService } from '../seznami/services/wallet.service';
import { WalletResponse } from '../seznami/models/wallet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
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
export class HomeComponent implements OnInit {
  wallet: WalletResponse | null = null;
  naslov = 'jfCasino'; 

  constructor(private walletService: WalletService, private router: Router) {}

  ngOnInit() {
    this.walletService.wallet$.subscribe(wallet => this.wallet = wallet);
    this.walletService.getWallet('mock_user_1').subscribe();
  }

  goToRoulette() {
    this.router.navigate(['/roulette']);
  }

  goToStats() {
    this.router.navigate(['/stats']);
  }
}