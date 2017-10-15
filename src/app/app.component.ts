import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase';

import { Config } from './shared/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Cook App';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: Config.getFirebaseApiKey(),
      authDomain: Config.getFirebaseAuthDomain()
    });
  }
}
