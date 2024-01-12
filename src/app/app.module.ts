import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { ImageSelectorComponent } from './shared/components/image-selector/image-selector.component';
import { CheckIdentityComponent } from './features/identification/check-identity/check-identity.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomepageComponent } from './core/components/homepage/homepage.component';
import { NewNavbarComponent } from './core/components/new-navbar/new-navbar.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { OcrComponent } from './features/ocr/ocr.component';
import * as Tesseract from 'tesseract.js';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ImageSelectorComponent,
    CheckIdentityComponent,
    HomepageComponent,
    NewNavbarComponent,
    LoginComponent,
    RegisterComponent,
    OcrComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
