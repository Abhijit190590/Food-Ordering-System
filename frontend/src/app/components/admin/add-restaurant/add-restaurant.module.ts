import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AddRestaurantComponent } from './add-restaurant.component';

@NgModule({
    declarations: [AddRestaurantComponent],
    imports: [CommonModule, FormsModule, RouterModule.forChild([{ path: '', component: AddRestaurantComponent }])]
})
export class AddRestaurantModule { }
