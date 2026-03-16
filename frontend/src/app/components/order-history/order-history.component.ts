import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/food.model';

@Component({
    selector: 'app-order-history',
    templateUrl: './order-history.component.html',
    styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
    orders: Order[] = [];
    loading = true;

    constructor(private orderService: OrderService) { }

    ngOnInit() {
        this.orderService.getMyOrders().subscribe({
            next: (o) => { this.orders = o; this.loading = false; },
            error: () => { this.loading = false; }
        });
    }

    getStatusClass(status: string): string {
        switch (status) {
            case 'Delivered': return 'status-delivered';
            case 'Cancelled': return 'status-cancelled';
            default: return 'status-active';
        }
    }
}
