import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { Restaurant } from '../../models/food.model';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    restaurants: Restaurant[] = [];
    filteredRestaurants: Restaurant[] = [];
    searchTerm = '';
    loading = true;

    constructor(private restaurantService: RestaurantService) { }

    ngOnInit() {
        this.restaurantService.getAll().subscribe({
            next: (data) => { this.restaurants = data; this.filteredRestaurants = data; this.loading = false; },
            error: () => { this.loading = false; }
        });
    }

    onSearch() {
        const term = this.searchTerm.toLowerCase();
        this.filteredRestaurants = this.restaurants.filter(
            r => r.name.toLowerCase().includes(term) || r.cuisineType.toLowerCase().includes(term)
        );
    }
}
