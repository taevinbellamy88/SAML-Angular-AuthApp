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

  loginWithGoogle(): void {}

  loginSaml(): void {
    window.location.href = 'http://localhost:50000/api/auth/initiate-saml';
  }
}
