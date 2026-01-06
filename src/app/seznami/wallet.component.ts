import { Component, OnInit } from '@angular/core';
import { WalletService } from './services/wallet.service';
import { WalletResponse } from './models/wallet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
})
export class WalletComponent implements OnInit {

  wallet: WalletResponse | null = null;
  loading = true;
  errorMessage = '';

  constructor(private walletService: WalletService, private router: Router) {}

  ngOnInit(): void {
    this.loadWallet();
        // Subscribe to the wallet Observable
    this.walletService.wallet$.subscribe(wallet => {
      this.wallet = wallet;
    });
  }

  loadWallet() {
    this.walletService.getWallet('mock_user_1').subscribe(
      data => {
        this.wallet = data;
        this.loading = false;
      },
      err => {
        console.error('Error fetching wallet', err);
        this.errorMessage = 'Failed to load wallet.';
        this.loading = false;
      }
    );
  }

  goToRoulette() {
    this.router.navigate(['/roulette']);
  }

  goToStats() {
    this.router.navigate(['/stats']);
  }
}
