import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

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
import { ValidateRegistrationComponent } from './features/validate-registration/validate-registration.component';
import { HttpClientModule } from '@angular/common/http';
import { UserProfileComponent } from './features/user-profile/user-profile.component';
import { CrossButtonComponent } from './features/cross-button/cross-button.component';
import { PasswordStrengthComponent } from './features/password-strength/password-strength.component';
import { AppNumbersOnlyDirective } from './features/app-numbers-only.directive';

import { NgToastModule } from 'ng-angular-popup';
import { ValidatenewComponent } from './features/validatenew/validatenew.component';
import { ValidateEmailComponent } from './features/auth/validate-email/validate-email.component';

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
    OcrComponent,
    ValidateRegistrationComponent,
    UserProfileComponent,
    CrossButtonComponent,
    PasswordStrengthComponent,
    AppNumbersOnlyDirective,
    ValidatenewComponent,
    ValidateEmailComponent,
    
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NgToastModule
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
