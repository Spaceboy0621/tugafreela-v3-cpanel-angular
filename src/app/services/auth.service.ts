import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthRequestDto } from './../dtos/auth/auth-request.dto';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponseDto } from '../dtos/auth/auth-response.dto';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }


  auth(login: AuthRequestDto) {
    return this.http.post<AuthResponseDto>(`${environment.api.url}/auth/local`, login);
  }

  getAuthenticatedUser(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl("/");
  }
}
