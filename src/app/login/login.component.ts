import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../saml-authentication.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = ''; // Define the email property
  password: string = '';
  loggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {}

  loginNative(event: Event): void {
    event.preventDefault();
    console.log('loginNative() called');
    if (this.email && this.password) {
      this.authService.loginNative(this.email, this.password).subscribe(
        (user) => {
          console.log('User logged in:', user);
          window.location.href = `http://localhost:4200/callbacks?code=${user.accessToken}&tokenType=${user.tokenType}`;
        },
        (error) => {
          console.error('Login error:', error);
        }
      );
    }
  }

  // signInWithFB(): void {
  //   this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  // }

  loginWithGoogle(): void {
    window.location.href = 'http://localhost:50000/api/auth/initiate-google';
  }

  loginSaml(type: string): void {
    const url = `${window.location.origin}/login-popup?type=${type}`;
    window.open(url, '_blank', 'width=500,height=500');
  }
}
