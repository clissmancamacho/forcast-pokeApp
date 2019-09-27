import { Injectable } from '@angular/core';

import urljoin from 'url-join';
import { BehaviorSubject } from 'rxjs';
import { User, Person } from '../../intefaces';

import { ApiService, } from '../api.service';
import { UtilService } from '../util.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState = new BehaviorSubject(false);
  authUrl = 'auth';
  currentUser: User;
  headers: Headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(
    private api: ApiService,
    private util: UtilService
  ) {}

  signup(user: User) {
    const body = user;
    const url = urljoin(this.authUrl, 'register');
    const service = this.api.post(url, body, { headers: this.headers });
    return service.toPromise();
  }

  signin(user: User) {
    const userIdentity = { identity: user.email, password: user.password };
    const body = userIdentity;
    const url = urljoin(this.authUrl, 'login');

    const service = this.api.post(url, body, { headers: this.headers });
    return service.toPromise();
  }

  login = async ({ user }) => {
    console.log(user)
    const objectPerson: Person = {
      firstName: user.person.firstName,
      lastName: user.person.lastName
    };

    this.currentUser = {
      email: user.email,
      password: null,
      person: objectPerson,
      _id: user._id,
    };

    await localStorage.setItem('token', user.token);
    await localStorage.setItem(
      'user',
      JSON.stringify({
        _id: user._id,
        email: user.email,
        firstName: user.person.firstName,
        lastName: user.person.lastName,
        rol: user.rol.name
      })
    );
    this.authState.next(true);
    return;
  }

  ifLoggedIn() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authState.next(true);
    }
  }

  isAuthenticated() {
    return this.authState.value;
  }

  async logout() {
    localStorage.clear();
    this.currentUser = null;
    this.authState.next(false);
  }

  public handleError = (error: any) => {
    const {
      error: { name },
      message
    } = error;

    if (name === 'TokenExpiredError') {
      this.util.openSnackBar('Tu sesión ha expirado');
    } else if (name === 'JsonWebTokenError') {
      this.util.openSnackBar('Ha habido un problema con tu sesión');
    } else {
      this.util.openSnackBar(
        message || 'Ha ocurrido un error. Inténtalo nuevamente');
    }
    this.logout();
  }
}
