import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { User } from '../../models/user.model';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    currentUser: User | null = null;
    cartCount = 0;
    menuOpen = false;

    constructor(
        public authService: AuthService,
        private cartService: CartService,
        private router: Router
    ) { }

    ngOnInit() {
        this.authService.currentUser$.subscribe(user => (this.currentUser = user));
        this.cartService.cart$.subscribe(cart => {
            this.cartCount = cart ? cart.items.reduce((s, i) => s + i.quantity, 0) : 0;
        });
    }

    logout() {
        this.authService.logout();
        this.cartService.setCart(null);
        this.router.navigate(['/login']);
    }

    toggleMenu() {
        this.menuOpen = !this.menuOpen;
    }
}
