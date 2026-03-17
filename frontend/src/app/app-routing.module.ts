import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {
        path: 'home',
        loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)
    },
    {
        path: 'restaurant/:id',
        loadChildren: () => import('./components/restaurant-detail/restaurant-detail.module').then(m => m.RestaurantDetailModule)
    },
    {
        path: 'cart',
        loadChildren: () => import('./components/cart/cart.module').then(m => m.CartModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'checkout',
        loadChildren: () => import('./components/checkout/checkout.module').then(m => m.CheckoutModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'orders',
        loadChildren: () => import('./components/order-history/order-history.module').then(m => m.OrderHistoryModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule)
    },
    {
        path: 'register',
        loadChildren: () => import('./components/register/register.module').then(m => m.RegisterModule)
    },
    {
        path: 'admin/add-restaurant',
        loadChildren: () => import('./components/admin/add-restaurant/add-restaurant.module').then(m => m.AddRestaurantModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'admin/add-menu-item',
        loadChildren: () => import('./components/admin/add-menu-item/add-menu-item.module').then(m => m.AddMenuItemModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'admin/approve-restaurants',
        loadChildren: () => import('./components/admin/approve-restaurants/approve-restaurants.module').then(m => m.ApproveRestaurantsModule),
        canActivate: [AuthGuard, AdminGuard]
    },
    {
        path: 'profile',
        loadChildren: () => import('./components/profile/profile.module').then(m => m.ProfileModule),
        canActivate: [AuthGuard]
    },
    { path: '**', redirectTo: '/home' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
