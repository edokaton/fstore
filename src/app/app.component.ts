import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { AuthenticationService } from './services/authentication.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, MenubarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  menu: MenuItem[] | undefined;

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    this.menu = [
      {
        label: 'Home',
        routerLink: '/',
      },
      {
        label: 'Cart',
        routerLink: '/cart',
      },
      {
        label: 'Logout',
        command: () => {
          this.authService.logoutUser();
        },
      },
    ];
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }
}
