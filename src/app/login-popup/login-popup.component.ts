import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../saml-authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.css'],
})
export class LoginPopupComponent implements OnInit {
  email: string | undefined;
  password: string | undefined;
  title: string = 'Login';
  backgroundImage: string = '/assets/images/msc.jpeg';

  constructor(
    private authService: AuthService,
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe((params) => {
      const type = params['type'];
      if (type === 'MSC') {
        this.backgroundImage = 'src/assets/images/msc.jpeg';
        this.title = 'MSC';
      } else if (type === 'Kennametal') {
        this.backgroundImage = 'src/assets/images/knm.jpeg';
        this.title = 'Kennametal';
      }
    });
  }

  ngOnInit() {
    const searchParams = new URLSearchParams(window.location.search);

    if (searchParams.has('type')) {
      const type = searchParams.get('type');

      if (type === 'MSC') {
        this.backgroundImage = '/assets/images/msc.jpeg';
      } else if (type === 'Kennametal') {
        this.backgroundImage = '/assets/images/knm.jpeg';
      }
    }

    // Hide the toolbar in the popup window
    const toolbar = this.renderer.selectRootElement('.toolbar');
    this.renderer.setStyle(toolbar, 'display', 'none');
  }

  onSubmit(): void {
    if (this.email && this.password) {
      this.authService.loginNative(this.email, this.password).subscribe({
        next: (user) => {
          console.log('Login successful', user);

          this.authService.setTempUserData(user); // Store the user data
          window.opener.location.href = `/callbacks?code=${user.accessToken}&tokenType=${user.tokenType}`; // Redirect the parent window
          window.close(); // Close the popup window
        },
        error: (error) => {
          console.error('Login error', error);
        },
      });
    }
  }

  loginSaml() {
    window.location.href = 'http://localhost:50000/api/auth/initiate-saml';
  }
}
