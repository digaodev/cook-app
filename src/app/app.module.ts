import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, // common module feats + other stuff
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    SharedModule,
    CoreModule,
    ShoppingListModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
