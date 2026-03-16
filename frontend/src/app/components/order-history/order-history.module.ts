import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderHistoryComponent } from './order-history.component';

@NgModule({
    declarations: [OrderHistoryComponent],
    imports: [CommonModule, RouterModule.forChild([{ path: '', component: OrderHistoryComponent }])]
})
export class OrderHistoryModule { }
