import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User, AuthResponse } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private apiUrl = environment.apiUrl + '/auth';
    private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
    public currentUser$ = this.currentUserSubject.asObservable();

    constructor(private http: HttpClient) { }

    private getUserFromStorage(): User | null {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }

    get currentUser(): User | null {
        return this.currentUserSubject.value;
    }

    get isLoggedIn(): boolean {
        return !!localStorage.getItem('token');
    }

    get isAdmin(): boolean {
        return this.currentUser?.role === 'admin';
    }

    register(data: { name: string; email: string; password: string; role?: string }): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data).pipe(
            tap((res) => this.handleAuth(res))
        );
    }

    login(data: { email: string; password: string }): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data).pipe(
            tap((res) => this.handleAuth(res))
        );
    }

    updateProfile(data: { name?: string; email?: string; password?: string }): Observable<AuthResponse> {
        return this.http.put<AuthResponse>(`${this.apiUrl}/profile`, data).pipe(
            tap((res) => this.handleAuth(res))
        );
    }

    private handleAuth(res: AuthResponse) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.currentUserSubject.next(res.user);
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.currentUserSubject.next(null);
    }
}
