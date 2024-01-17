import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './core/components/homepage/homepage.component';
import { LoginComponent } from './features/auth/login/login.component';
import { OcrComponent } from './features/ocr/ocr.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { ValidateRegistrationComponent } from './features/validate-registration/validate-registration.component';

const routes: Routes = [
  {
    path: '',
    component: OcrComponent,
    
  },
  {
    path:'login',
    component:LoginComponent
  },{
    path:'register',
    component:RegisterComponent
  },{
    path:'verify',
    component:ValidateRegistrationComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
