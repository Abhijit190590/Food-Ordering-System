import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  name = '';
  email = '';
  password = '';
  error = '';
  success = '';
  loading = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
      if (user) {
        this.name = user.name;
        this.email = user.email;
      }
    });
  }

  onSubmit(): void {
    this.loading = true;
    this.error = '';
    this.success = '';

    this.authService.updateProfile({
      name: this.name,
      email: this.email,
      password: this.password || undefined
    }).subscribe({
      next: () => {
        this.success = 'Profile updated successfully!';
        this.loading = false;
        this.password = ''; // Clear password field
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to update profile';
        this.loading = false;
      }
    });
  }
}
