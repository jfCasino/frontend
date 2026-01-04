import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { WalletComponent } from './seznami/wallet.component';
import { RouletteComponent } from './seznami/roulette.component';
import { StatisticsComponent } from './seznami/stats.component';

import { WalletService } from './seznami/services/wallet.service';
import { RouletteService } from './seznami/services/roulette.service';
import { StatisticsService } from './seznami/services/stats.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    WalletComponent,
    RouletteComponent,
    StatisticsComponent
  ],
  providers: [
    WalletService,
    RouletteService,
    StatisticsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
