import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import { NakupovalniSeznam } from './models/seznam';
import { SeznamiService } from './services/seznami.service';

@Component({
    moduleId: module.id,
    selector: 'vsi-seznami',
    templateUrl: 'seznami.component.html'
})
export class SeznamiComponent implements OnInit {
    seznami: NakupovalniSeznam[];
    seznam: NakupovalniSeznam;

    constructor(private seznamiService: SeznamiService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.getSeznami();
    }

    getSeznami(): void {
        this.seznamiService
            .getSeznami()
            .subscribe(seznami => this.seznami = seznami);
    }

    naPodrobnosti(seznam: NakupovalniSeznam): void {
        this.seznam = seznam;
        this.router.navigate(['/seznami', this.seznam.id]);
    }

    delete(seznam: NakupovalniSeznam): void {
        this.seznamiService
            .delete(seznam.id)
            .subscribe(seznamId => this.seznami = this.seznami.filter(s => s.id !== seznamId));
    }

}
