import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('Login loaded => ');
  }

  login() {
    this.authenticationService
      .loginUser({ username: this.username, password: this.password })
      .subscribe({
        next: (token: string) => {
          console.log('token', token);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  navigateToProduct() {
    this.router.navigate(['/products']);
  }
}
