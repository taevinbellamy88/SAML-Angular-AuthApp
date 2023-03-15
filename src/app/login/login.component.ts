import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../saml-authentication.service';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';

import { GoogleAuth } from 'google-auth-library';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = ''; // Define the email property
  password: string = '';
  user: SocialUser = new SocialUser();
  loggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private socialAuthService: SocialAuthService
  ) {}

  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
    });
  }

  loginNative(): void {
    //this.router.navigate(['/home']);
    this.authService
      .loginNative(this.email, this.password)
      .subscribe((result) => {
        if (result) {
          this.router.navigate(['/home']);
        }
      });
  }

  // signInWithFB(): void {
  //   this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  // }

  loginWithGoogle(): void {
    this.socialAuthService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(() => this.router.navigate(['success']));
  }

  signOut(): void {
    this.socialAuthService.signOut();
  }

  loginSaml(): void {
    this.authService
      .loginSaml(this.email, this.password)
      .subscribe((result) => {
        if (result) {
          this.router.navigate(['/home']);
        }
      });
  }
}
