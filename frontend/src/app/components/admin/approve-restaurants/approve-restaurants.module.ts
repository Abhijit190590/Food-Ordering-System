import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApproveRestaurantsComponent } from './approve-restaurants.component';

@NgModule({
    declarations: [ApproveRestaurantsComponent],
    imports: [CommonModule, RouterModule.forChild([{ path: '', component: ApproveRestaurantsComponent }])]
})
export class ApproveRestaurantsModule { }
