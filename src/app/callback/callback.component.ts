import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../saml-authentication.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css'],
})
export class CallbackComponent implements OnInit {
  code: string | undefined;
  tokenType: string | undefined;
  userData: any | undefined;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.code = params['code'];
      this.tokenType = params['tokenType'];
      console.log(params);
    });
    this.userData =
      this.router.getCurrentNavigation()?.extras.state?.['userData'];
  }

  //
  //
  //
  //

  goBack() {
    this.location.back();
  }
  goHome() {
    this.router.navigate(['/home']);
  }
  goToMC() {
    window.open('https://www.machiningcloud.com/app/en', '_blank');
  }
}
