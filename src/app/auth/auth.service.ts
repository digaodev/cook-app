import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase';

@Injectable()
export class AuthService {
  private _token: string;
  private _email: string;

  constructor(private _router: Router) {}

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch((error) => console.log(error));
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((res) => {
        this._email = res.email;
        this._router.navigate(['/']);
        firebase.auth().currentUser.getIdToken()
          .then((token: string) => this._token = token);
      })
      .catch((error) => console.log(error));
  }

  getToken() { // refactor: unreliable - can return expired token
    firebase.auth().currentUser.getIdToken()
      .then((token: string) => this._token = token);
      return this._token;
  }

  getFullEmail() {
    return this._email;
  }

  getUsernameFromEmail() {
    return this._email.split('@')[0];
  }

  signoutUser() {
    firebase.auth().signOut();
    this._token = null;
  }

  isAuthenticated() {
    return this._token != null;
  }
}
