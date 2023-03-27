import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../saml-authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public userName: any;
  public userEmail: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe((user) => {
      this.userName = user.name;
      this.userEmail = user.email;
    });
  }

  logoutUser(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
