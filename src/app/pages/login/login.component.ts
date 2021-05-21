import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  identifier: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.auth({identifier: this.identifier, password: this.password}).subscribe(
      success => {
        if (success.user.type !== 'Moderador' && success.user.type !== 'Admin') {
          alert('Erro ao realizar login');
          console.error(['Erro ao realizar login']);
          return;
        }
        else {
          localStorage.setItem("user", JSON.stringify(success.user));
          localStorage.setItem("token", success.jwt);
          this.router.navigate(['pages']);
        }
        
      },
      error => {
        alert('Erro ao realizar login');
        console.error(['Erro ao realizar login', error])
      }
    )
  }

}
