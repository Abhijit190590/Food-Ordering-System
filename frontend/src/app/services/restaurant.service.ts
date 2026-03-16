import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from '../models/food.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class RestaurantService {
    private apiUrl = environment.apiUrl + '/restaurants';

    constructor(private http: HttpClient) { }

    getAll(): Observable<Restaurant[]> {
        return this.http.get<Restaurant[]>(this.apiUrl);
    }

    getById(id: string): Observable<Restaurant> {
        return this.http.get<Restaurant>(`${this.apiUrl}/${id}`);
    }

    create(data: Partial<Restaurant>): Observable<Restaurant> {
        return this.http.post<Restaurant>(this.apiUrl, data);
    }

    delete(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
