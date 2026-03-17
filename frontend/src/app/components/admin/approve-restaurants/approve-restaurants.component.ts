import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../../services/restaurant.service';
import { Restaurant } from '../../../models/food.model';

@Component({
    selector: 'app-approve-restaurants',
    templateUrl: './approve-restaurants.component.html',
    styleUrls: ['./approve-restaurants.component.css']
})
export class ApproveRestaurantsComponent implements OnInit {
    restaurants: Restaurant[] = [];
    loading = true;
    error = '';

    constructor(private restaurantService: RestaurantService) { }

    ngOnInit() {
        this.loadRestaurants();
    }

    loadRestaurants() {
        this.loading = true;
        this.restaurantService.getAdminAll().subscribe({
            next: (data) => {
                this.restaurants = data;
                this.loading = false;
            },
            error: (err) => {
                this.error = 'Failed to load restaurants';
                this.loading = false;
            }
        });
    }

    approveRestaurant(id: string | undefined) {
        if (!id) return;
        this.restaurantService.approve(id).subscribe({
            next: () => {
                const rest = this.restaurants.find(r => r._id === id);
                if (rest) rest.isApproved = true;
            },
            error: (err) => {
                this.error = 'Failed to approve restaurant';
            }
        });
    }
}
