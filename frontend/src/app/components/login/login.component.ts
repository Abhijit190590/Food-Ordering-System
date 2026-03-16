import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    email = '';
    password = '';
    error = '';
    loading = false;

    constructor(private authService: AuthService, private router: Router) { }

    onSubmit() {
        this.loading = true; this.error = '';
        this.authService.login({ email: this.email, password: this.password }).subscribe({
            next: () => { this.loading = false; this.router.navigate(['/home']); },
            error: (err) => { this.loading = false; this.error = err.error?.message || 'Login failed'; }
        });
    }
}
