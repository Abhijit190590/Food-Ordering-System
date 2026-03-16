import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/food.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class OrderService {
    private apiUrl = environment.apiUrl + '/orders';

    constructor(private http: HttpClient) { }

    placeOrder(data: { deliveryAddress: string; paymentMethod: string }): Observable<Order> {
        return this.http.post<Order>(this.apiUrl, data);
    }

    getMyOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(this.apiUrl);
    }

    getOrder(id: string): Observable<Order> {
        return this.http.get<Order>(`${this.apiUrl}/${id}`);
    }
}
