import { Rating } from './../models/rating.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    loadProfile() {
        return this.http.get<any>(`${environment.api.url}/anys/1`);
    }

    updateProfile(any: any) {
        return this.http.put<any>(`${environment.api.url}/anys/${any.id}`, any);
    }

    update(user: User) {
        return this.http.put<any>(`${environment.api.url}/users/${user.id}`, user);
    }
    
    uploadPhoto(form: FormData) {
        return this.http.post(`${environment.api.url}/upload`, form, { headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        }});
    }

    deletePhoto(idPhoto: number) {
        return this.http.delete(`${environment.api.url}/upload/files/${idPhoto}`);
    }

    search(filters: any) {
        return this.http.post<User[]>(`${environment.api.url}/users/search`, filters);
    }
  
    getById(id: number):Observable<User> {
        return this.http.get<User>(`${environment.api.url}/users/${id}`);
    }

    getAll():Observable<User[]> {
        return this.http.get<User[]>(`${environment.api.url}/users`);
    }

    rateUser(rating: Rating) {
        return this.http.post(`${environment.api.url}/ratings/`, rating);
    }

    getFeedbacks(user: User) {
        return this.http.get<Rating[]>(`${environment.api.url}/ratings/feedback/${user.id}`);
    }
}