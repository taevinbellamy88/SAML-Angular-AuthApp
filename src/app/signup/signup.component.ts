import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRegister } from '../userRegister';
import { AuthService } from '../saml-authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  public createForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.createForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSignUp(signupForm: UserRegister) {
    console.log(`FormData:`, signupForm);
    this.authService.signup(signupForm).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
