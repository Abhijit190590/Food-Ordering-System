import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CheckoutComponent } from './checkout.component';

@NgModule({
    declarations: [CheckoutComponent],
    imports: [CommonModule, FormsModule, RouterModule.forChild([{ path: '', component: CheckoutComponent }])]
})
export class CheckoutModule { }
