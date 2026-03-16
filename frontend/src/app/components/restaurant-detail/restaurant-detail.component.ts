import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../../services/restaurant.service';
import { MenuService } from '../../services/menu.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Restaurant, MenuItem } from '../../models/food.model';

@Component({
    selector: 'app-restaurant-detail',
    templateUrl: './restaurant-detail.component.html',
    styleUrls: ['./restaurant-detail.component.css']
})
export class RestaurantDetailComponent implements OnInit {
    restaurant: Restaurant | null = null;
    menuItems: MenuItem[] = [];
    categories: string[] = [];
    loading = true;
    addingId: string | null = null;

    constructor(
        private route: ActivatedRoute,
        private restaurantService: RestaurantService,
        private menuService: MenuService,
        private cartService: CartService,
        public authService: AuthService
    ) { }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id')!;
        this.restaurantService.getById(id).subscribe(r => { this.restaurant = r; });
        this.menuService.getByRestaurant(id).subscribe(items => {
            this.menuItems = items;
            this.categories = [...new Set(items.map(i => i.category))];
            this.loading = false;
        });
    }

    getItemsByCategory(cat: string): MenuItem[] {
        return this.menuItems.filter(i => i.category === cat);
    }

    addToCart(item: MenuItem) {
        if (!this.authService.isLoggedIn || !this.restaurant) return;
        this.addingId = item._id;
        this.cartService.addItem(item._id, this.restaurant._id).subscribe({
            next: () => { setTimeout(() => this.addingId = null, 600); },
            error: () => { this.addingId = null; }
        });
    }
}
