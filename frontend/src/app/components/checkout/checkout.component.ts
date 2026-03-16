import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { Cart } from '../../models/food.model';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
    cart: Cart | null = null;
    deliveryAddress = '';
    paymentMethod = 'Cash on Delivery';
    loading = false;
    error = '';

    constructor(
        private cartService: CartService,
        private orderService: OrderService,
        private router: Router
    ) { }

    ngOnInit() {
        this.cartService.getCart().subscribe(c => {
            this.cart = c;
            if (!c || c.items.length === 0) this.router.navigate(['/cart']);
        });
    }

    get total(): number {
        if (!this.cart) return 0;
        return this.cart.items.reduce((s, i) => s + i.price * i.quantity, 0);
    }

    placeOrder() {
        if (!this.deliveryAddress.trim()) { this.error = 'Please enter a delivery address'; return; }
        this.loading = true; this.error = '';
        this.orderService.placeOrder({ deliveryAddress: this.deliveryAddress, paymentMethod: this.paymentMethod }).subscribe({
            next: () => {
                this.cartService.setCart(null);
                this.router.navigate(['/orders']);
            },
            error: (err) => { this.loading = false; this.error = err.error?.message || 'Failed to place order'; }
        });
    }
}
