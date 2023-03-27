import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CallbackComponent } from './callback/callback.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { LoginPopupComponent } from './login-popup/login-popup.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'login-popup', component: LoginPopupComponent },
  { path: 'callbacks', component: CallbackComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
