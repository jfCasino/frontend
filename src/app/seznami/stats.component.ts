import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../seznami/services/stats.service';
import { BetResponse, WalletResponse } from '../seznami/models/stats';

@Component({
  selector: 'app-statistics',
  templateUrl: './stats.component.html',
})
export class StatisticsComponent implements OnInit {

  userBets: BetResponse[] = [];
  top5: WalletResponse[] = [];

  constructor(private statsService: StatisticsService) {}

  ngOnInit(): void {
    this.loadUserBets();
    this.loadLeaderboardTop5();
  }

  loadUserBets() {
    this.statsService.getBetStatistics('mock_user_1', 'desc', 10).subscribe(
      data => this.userBets = data,
      err => console.error('Error fetching user bets', err)
    );
  }

  loadLeaderboardTop5() {
    this.statsService.getLeaderboardTop5().subscribe(
      data => this.top5 = data,
      err => console.error('Error fetching leaderboard', err)
    );
  }

}
