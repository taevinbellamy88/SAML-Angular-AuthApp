import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../saml-authentication.service';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loggedIn: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {}

  loginNative(): void {
    console.log('loginNative() called');
    const email = this.loginForm.controls['email'].value as string;
    const password = this.loginForm.value.password as string;
    if (this.loginForm.valid) {
      this.authService.loginNative(email, password).subscribe(
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
