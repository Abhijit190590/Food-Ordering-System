import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuItem } from '../models/food.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MenuService {
    private apiUrl = environment.apiUrl + '/menu';

    constructor(private http: HttpClient) { }

    getByRestaurant(restaurantId: string): Observable<MenuItem[]> {
        return this.http.get<MenuItem[]>(`${this.apiUrl}/${restaurantId}`);
    }

    create(data: Partial<MenuItem>): Observable<MenuItem> {
        return this.http.post<MenuItem>(this.apiUrl, data);
    }

    delete(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
