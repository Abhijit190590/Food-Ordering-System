import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Cart } from '../models/food.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CartService {
    private apiUrl = environment.apiUrl + '/cart';
    private cartSubject = new BehaviorSubject<Cart | null>(null);
    public cart$ = this.cartSubject.asObservable();

    constructor(private http: HttpClient) { }

    get cartCount(): number {
        const cart = this.cartSubject.value;
        if (!cart) return 0;
        return cart.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    get cartTotal(): number {
        const cart = this.cartSubject.value;
        if (!cart) return 0;
        return cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }

    getCart(): Observable<Cart> {
        return this.http.get<Cart>(this.apiUrl).pipe(
            tap((cart) => this.cartSubject.next(cart))
        );
    }

    addItem(menuItemId: string, restaurantId: string): Observable<Cart> {
        return this.http.post<Cart>(`${this.apiUrl}/add`, { menuItemId, restaurantId }).pipe(
            tap((cart) => this.cartSubject.next(cart))
        );
    }

    updateQuantity(menuItemId: string, quantity: number): Observable<Cart> {
        return this.http.put<Cart>(`${this.apiUrl}/update`, { menuItemId, quantity }).pipe(
            tap((cart) => this.cartSubject.next(cart))
        );
    }

    clearCart(): Observable<any> {
        return this.http.delete(`${this.apiUrl}/clear`).pipe(
            tap(() => this.cartSubject.next(null))
        );
    }

    setCart(cart: Cart | null) {
        this.cartSubject.next(cart);
    }
}
