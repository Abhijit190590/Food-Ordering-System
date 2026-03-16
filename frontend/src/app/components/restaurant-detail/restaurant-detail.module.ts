import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RestaurantDetailComponent } from './restaurant-detail.component';

@NgModule({
    declarations: [RestaurantDetailComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([{ path: '', component: RestaurantDetailComponent }])
    ]
})
export class RestaurantDetailModule { }
