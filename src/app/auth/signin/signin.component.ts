import { NgForm } from '@angular/forms/src/directives';
import { Component, OnInit } from '@angular/core';

import { AuthService } from './../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private _authService: AuthService) { }

  ngOnInit() {
  }

  onSignin (signinForm: NgForm) {
    const email = signinForm.value.email;
    const password = signinForm.value.password;

    this._authService.signinUser(email, password);
  }

}
