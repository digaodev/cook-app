import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { AuthService } from './../../auth/auth.service';
import { DataStorageService } from './../../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private _dataStorageService: DataStorageService,
    private authService: AuthService,
    private _router: Router) { }

  onSaveData() {
    this._dataStorageService.storeRecipes()
      .subscribe((response) => {
        console.log(response);
      });
  }

  onFetchData() {
    this._dataStorageService.getRecipes();
  }

  onLogout() {
    this.authService.signoutUser();
    this._router.navigate(['signin']);
  }
}
