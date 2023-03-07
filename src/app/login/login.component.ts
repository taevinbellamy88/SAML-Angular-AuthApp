import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../saml-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = ''; // Define the email property

  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  login(): void {
    this.authService.login(this.email, this.password).subscribe((result) => {
      if (result) {
        this.router.navigate(['/home']);
      }
    });
  }
  loginGoogle(): void {
    this.authService
      .loginGoogle(this.email, this.password)
      .subscribe((result) => {
        if (result) {
          this.router.navigate(['/home']);
        }
      });
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
