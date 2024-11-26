import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { StyleClassModule } from 'primeng/styleclass';

@Component({
  selector: 'app-login',
  imports: [
    InputTextModule,
    FormsModule,
    FloatLabelModule,
    ButtonModule,
    PasswordModule,
    CardModule,
    StyleClassModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  isLoading: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('Login loaded => ');
  }

  login() {
    this.isLoading = true;
    this.authenticationService
      .loginUser({ username: this.username, password: this.password })
      .subscribe({
        next: (token: string) => {
          this.authenticationService.setToken(token);
          this.isLoading = false;
          this.navigateToProduct();
        },
        error: (error) => {
          console.log(error);
          this.isLoading = false;
        },
      });
  }

  navigateToProduct() {
    this.router.navigate(['/products']);
  }
}
