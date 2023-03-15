import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css'],
})
export class CallbackComponent implements OnInit {
  code: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  goBack() {
    this.location.back();
  }
  goHome() {
    this.router.navigate(['/home']);
  }
  goToMC() {
    window.open('https://www.machiningcloud.com/app/en', '_blank');
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.code = params['code'];
      console.log(params, this.route);
    });
  }
}
