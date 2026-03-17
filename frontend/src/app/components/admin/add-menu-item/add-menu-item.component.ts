import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../services/menu.service';
import { RestaurantService } from '../../../services/restaurant.service';
import { Restaurant } from '../../../models/food.model';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-add-menu-item',
    templateUrl: './add-menu-item.component.html',
    styleUrls: ['./add-menu-item.component.css']
})
export class AddMenuItemComponent implements OnInit {
    restaurants: Restaurant[] = [];
    restaurant = '';
    name = '';
    description = '';
    price: number = 0;
    imageUrl = '';
    category = 'Main Course';
    isVeg = true;
    error = '';
    success = '';
    loading = false;

    constructor(
        private menuService: MenuService, 
        private restaurantService: RestaurantService,
        public authService: AuthService
    ) { }

    ngOnInit() {
        if (this.authService.isAdmin) {
            this.restaurantService.getAdminAll().subscribe((r: Restaurant[]) => this.restaurants = r);
        } else {
            this.restaurantService.getMy().subscribe((r: Restaurant[]) => this.restaurants = r);
        }
    }

    onSubmit() {
        this.loading = true; this.error = ''; this.success = '';
        this.menuService.create({
            name: this.name, description: this.description, price: this.price,
            imageUrl: this.imageUrl, category: this.category, isVeg: this.isVeg,
            restaurant: this.restaurant
        }).subscribe({
            next: () => {
                this.success = 'Menu item added successfully!';
                this.loading = false;
                this.name = ''; this.description = ''; this.price = 0; this.imageUrl = '';
            },
            error: (err) => { this.loading = false; this.error = err.error?.message || 'Failed to add item'; }
        });
    }
}
