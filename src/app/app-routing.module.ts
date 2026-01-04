import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RouletteComponent} from './seznami/roulette.component';
import {WalletComponent} from './seznami/wallet.component';
import {StatisticsComponent} from './seznami/stats.component';
import {HomeComponent} from './seznami/home.component';

const routes: Routes = [
    { path: 'wallets', component: WalletComponent },
    { path: 'roulette', component: RouletteComponent },
    { path: 'stats', component: StatisticsComponent },
    { path: '', redirectTo: '/', pathMatch: 'full' } // root goes to AppComponent by default
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
