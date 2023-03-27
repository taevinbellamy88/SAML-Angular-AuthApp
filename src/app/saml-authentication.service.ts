import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';
import { User } from './user';
import { UserRegister } from './userRegister';
import { corsConfig } from './cors.config';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authUrl = 'http://localhost:50000/api/auth'; // Adjust the URL to match your .NET 6 API endpoint

  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private isAuthenticated = false;
  private _tempUserData: any;

  constructor(private http: HttpClient, private router: Router) {
    //
    localStorage.setItem(
      'currentUser',
      JSON.stringify({
        id: 1,
        email: 'mc.user@machiningcloud.com',
        firstName: 'MachiningCloud',
        lastName: 'Dev',
        token: 'fake-jwt-token',
      })
    );
    const storedUser = localStorage.getItem('currentUser');
    console.log(storedUser);
    //

    let initialUser: User | null = null;

    if (storedUser) {
      try {
        initialUser = JSON.parse(storedUser);
      } catch (e) {
        console.error(`Error parsing stored user: ${e}`);
      }
    }
    this.currentUserSubject = new BehaviorSubject<User | null>(initialUser);
    this.currentUser = this.currentUserSubject
      .asObservable()
      .pipe(filter((user) => user !== null));
  }

  setTempUserData(user: any): void {
    this._tempUserData = user;
    console.log(user);
  }

  getTempUserData(): any {
    const tempUser = this._tempUserData;
    this._tempUserData = null; // Clear the temporary data
    return tempUser;
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  getUser(): Observable<{ email: string; name: string }> {
    return this.http.get<{ email: string; name: string }>(
      `${this.authUrl}/isAuthenticated`,
      {
        withCredentials: true,
      }
    );
  }

  isUserAuthenticated(): Observable<boolean> {
    return this.http.get<boolean>(`${this.authUrl}/isAuthenticated`, {
      withCredentials: true,
    });
  }

  signup(form: UserRegister) {
    return this.http
      .post<any>(
        'http://localhost:50000/api/auth/signup',
        {
          email: form.email,
          password: form.password,
          firstName: form.firstName,
          lastName: form.lastName,
        },
        corsConfig
      )
      .pipe(
        map((user) => {
          if (user && user.token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            this.isAuthenticated = true;
          }
          return user;
        })
      );
  }

  loginNative(email: string, password: string) {
    console.log(email, password);
    return this.http
      .post<any>('http://localhost:50000/api/auth/login', {
        email: email,
        password: password,
        firstName: 'test',
        lastName: 'user',
      })
      .pipe(
        map((user) => {
          if (user && user.token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            this.isAuthenticated = true;
          }
          return user;
        })
      );
  }

  logout(): Observable<boolean> {
    console.log('logout firing');
    return this.http
      .post<boolean>(`${this.authUrl}/logoutUser`, {
        withCredentials: true,
      })
      .pipe(
        map(() => {
          localStorage.removeItem('currentUser');
          this.currentUserSubject.next(null);
          this.isAuthenticated = false;
          this.router.navigate(['/login']);
          return true;
        })
      );
  }
}
