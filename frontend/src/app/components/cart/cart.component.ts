import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Cart, CartItem } from '../../models/food.model';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
    cart: Cart | null = null;
    loading = true;

    constructor(private cartService: CartService, private router: Router) { }

    ngOnInit() {
        this.cartService.getCart().subscribe({
            next: (c) => { this.cart = c; this.loading = false; },
            error: () => { this.loading = false; }
        });
    }

    get total(): number {
        if (!this.cart) return 0;
        return this.cart.items.reduce((s, i) => s + i.price * i.quantity, 0);
    }

    updateQty(item: CartItem, delta: number) {
        const newQty = item.quantity + delta;
        this.cartService.updateQuantity(item.menuItem, newQty).subscribe(c => this.cart = c);
    }

    clearCart() {
        this.cartService.clearCart().subscribe(() => this.cart = null);
    }

    goToCheckout() {
        this.router.navigate(['/checkout']);
    }
}
