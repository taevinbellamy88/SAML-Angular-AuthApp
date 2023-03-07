import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { User } from './user';
import { UserRegister } from './userRegister';
import { corsConfig } from './cors.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private isAuthenticated = false;

  constructor(private http: HttpClient) {
    ///TEMPORARY USAGE///
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
    //
    ///TEMPORARY USAGE///

    const storedUser = localStorage.getItem('currentUser');

    //
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

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
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

  login(username: string, password: string) {
    console.log(username, password);
    return this.http
      .post<any>('http://localhost:50000/api/auth/login', {
        email: username,
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

  loginGoogle(username: string, password: string) {
    console.log(username, password);
    return this.http
      .post<any>('http://localhost:50000/api/auth/login', {
        email: username,
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

  loginSaml(username: string, password: string) {
    console.log(username, password);
    return this.http
      .post<any>('http://localhost:50000/api/auth/login', {
        email: username,
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
  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.isAuthenticated = false;
  }

  public getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }
}
