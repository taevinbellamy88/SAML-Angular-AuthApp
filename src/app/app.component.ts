// app.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'SAML-Auth-App';

  constructor(private router: Router) {}

  ngOnInit() {
    window.addEventListener('message', this.receiveMessage, false);
  }

  receiveMessage = (event: MessageEvent) => {
    if (event.data === 'authenticated-in-dotnet') {
      this.router.navigate(['/callbacks']); // Replace '/desired-route' with the route you want to navigate to
    }
  };

  ngOnDestroy() {
    window.removeEventListener('message', this.receiveMessage);
  }
}
