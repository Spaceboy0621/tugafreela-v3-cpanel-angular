import { AuthService } from './../../services/auth.service';
import { User } from './../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  hoje: number = Date.now();
  user: User = new User();

  isCollapsed: boolean;
  isToggled: boolean = false;

  constructor(
      private sidebarService: SidebarService,
      private authService: AuthService,
      private router: Router
  ) {
      this.isCollapsed = true;
  }

  ngOnInit(): void {
    this.user = this.authService.getAuthenticatedUser();
  }

  toggleSidebar() {
      this.isToggled = !this.isToggled;
      this.sidebarService.changeVisibility(this.isToggled);
  }

  logout() {
      this.authService.logout();
  }
}