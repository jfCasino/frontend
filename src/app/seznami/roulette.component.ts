import { Component, OnInit } from '@angular/core';
import { RouletteService } from '../seznami/services/roulette.service';
import { WalletService } from '../seznami/services/wallet.service';
import { MultiBetRequest, MultiBetResponse, SingleBetResult, SingleBetRequest } from '../seznami/models/roulette';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-roulette',
  templateUrl: './roulette.component.html',
 // optional CSS
})
export class RouletteComponent implements OnInit {
  
  bets: SingleBetRequest[] = [{ betType: 'NUMBER', target: '', amount: 1 }];
  spinResults: SingleBetResult[] = [];
  totalPayout: number = 0;
  spinColor: string = '';
  spinNumber: number | null = null;

@Output() walletUpdated = new EventEmitter<void>(); 

  constructor(
    private rouletteService: RouletteService,
    private walletService: WalletService // injected for wallet updates
  ) {}

  ngOnInit(): void {
    // Initialize target options for the first bet
    this.bets.forEach(bet => this.updateTargetOptions(bet));
  }

  addBet() {
    const newBet: SingleBetRequest = { betType: 'NUMBER', target: '', amount: 1 };
    this.updateTargetOptions(newBet);
    this.bets.push(newBet);
  }

  removeBet(index: number) {
    if (this.bets.length > 1) {
      this.bets.splice(index, 1);
    }
  }

  // Update the target dropdown/options when bet type changes
  updateTargetOptions(bet: any) {
    switch (bet.betType) {
      case 'NUMBER':
        bet.targetOptions = ['0', ...Array.from({ length: 36 }, (_, i) => (i + 1).toString())];
        break;
      case 'COLOR':
        bet.targetOptions = ['RED', 'BLACK'];
        break;
      case 'ODD_EVEN':
        bet.targetOptions = ['ODD', 'EVEN'];
        break;
      case 'THIRDS':
        bet.targetOptions = ['1ST', '2ND', '3RD'];
        break;
      default:
        bet.targetOptions = [];
    }

    // Set the first value as default if target is empty
    if (!bet.target && bet.targetOptions.length > 0) {
      bet.target = bet.targetOptions[0];
    }
  }

  placeBets() {
    if (!this.bets || this.bets.length === 0) return;

    // Reset previous results
    this.spinResults = [];
    this.totalPayout = 0;
    this.spinColor = '';
    this.spinNumber = null;

    const request: MultiBetRequest = {
      userID: 'mock_user_1',
      bets: [...this.bets] // spread to create a new array
    };

    this.rouletteService.placeBet(request).subscribe(
      (res: MultiBetResponse) => {
        this.spinResults = res.betResults;
        this.totalPayout = res.totalWinnings;
        this.spinColor = res.spinResultColor;
        this.spinNumber = res.spinResultNumber;

        // Refresh wallet after bet
        this.walletService.getWallet(request.userID).subscribe();

        // Optional: reset bets for next round (uncomment if needed)
        // this.bets = [{ betType: 'NUMBER', target: '', amount: 1 }];
        // this.bets.forEach(bet => this.updateTargetOptions(bet));
        // Emit event to refresh wallet
        this.walletUpdated.emit();
      },
      err => console.error('Error placing bets', err)
    );
  }
}
