import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantService } from '../../../services/restaurant.service';

@Component({
    selector: 'app-add-restaurant',
    templateUrl: './add-restaurant.component.html',
    styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent {
    name = '';
    description = '';
    imageUrl = '';
    cuisineType = 'Multi-Cuisine';
    deliveryTime = '30-45 mins';
    minOrder = 100;
    error = '';
    success = '';
    loading = false;

    constructor(private restaurantService: RestaurantService, private router: Router) { }

    onSubmit() {
        this.loading = true; this.error = ''; this.success = '';
        this.restaurantService.create({
            name: this.name, description: this.description, imageUrl: this.imageUrl,
            cuisineType: this.cuisineType, deliveryTime: this.deliveryTime, minOrder: this.minOrder
        } as any).subscribe({
            next: () => {
                this.success = 'Restaurant added successfully!';
                this.loading = false;
                this.name = ''; this.description = ''; this.imageUrl = '';
            },
            error: (err) => { this.loading = false; this.error = err.error?.message || 'Failed to add'; }
        });
    }
}
