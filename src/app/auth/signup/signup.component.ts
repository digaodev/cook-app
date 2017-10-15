import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { AuthService } from './../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private _authService: AuthService) { }

  ngOnInit() {
  }

  onSignup (signupForm: NgForm) {
    const email = signupForm.value.email;
    const password = signupForm.value.password;

    this._authService.signupUser(email, password);
  }
}
