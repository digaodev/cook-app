import { Response } from '@angular/http';
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
    private authService: AuthService) { }

  onSaveData() {
    this._dataStorageService.storeRecipes()
      .subscribe((response: Response) => {
        console.log(response);
      });
  }

  onFetchData() {
    this._dataStorageService.getRecipes();
  }

  onLogout() {
    this.authService.signoutUser();
  }
}
