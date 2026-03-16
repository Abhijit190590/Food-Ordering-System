import { Component, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-root',
    template: `<app-navbar></app-navbar><router-outlet></router-outlet>`,
    styles: [`
    :host { display: block; min-height: 100vh; }
  `]
})
export class AppComponent implements OnInit {
    constructor(private cartService: CartService, private authService: AuthService) { }

    ngOnInit() {
        if (this.authService.isLoggedIn) {
            this.cartService.getCart().subscribe({ error: () => { } });
        }
    }
}
