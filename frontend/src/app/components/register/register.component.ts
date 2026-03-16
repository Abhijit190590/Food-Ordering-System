import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    name = '';
    email = '';
    password = '';
    role = 'user';
    error = '';
    loading = false;

    constructor(private authService: AuthService, private router: Router) { }

    onSubmit() {
        this.loading = true; this.error = '';
        this.authService.register({ name: this.name, email: this.email, password: this.password, role: this.role }).subscribe({
            next: () => { this.loading = false; this.router.navigate(['/home']); },
            error: (err) => { this.loading = false; this.error = err.error?.message || 'Registration failed'; }
        });
    }
}
