import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './core/components/homepage/homepage.component';
import { LoginComponent } from './features/auth/login/login.component';
import { OcrComponent } from './features/ocr/ocr.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { ValidateRegistrationComponent } from './features/validate-registration/validate-registration.component';
import { UserProfileComponent } from './features/user-profile/user-profile.component';
import { authGuard } from './features/auth/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: OcrComponent,
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'verify',
    component:ValidateRegistrationComponent,
    canActivate: [authGuard]
  },
  {
    path:'user',
    component:UserProfileComponent,
    canActivate: [authGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
