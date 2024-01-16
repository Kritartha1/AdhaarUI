import { Component } from '@angular/core';
import { SignupRequest } from '../models/signup-request';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  model: SignupRequest;

  /**
   *
   */
  constructor(private authService: AuthService, private cookieService: CookieService, private router: Router) {
    
    this.model = {
      email: '',
      password: '',
      roles:[]
    };
  }

  onFormSubmit(): void {
    this.authService.register(this.model)
      .subscribe({
        next: (response) => {

          // const tokenExpirationTime = 1 * 60 * 1000; // 15 minutes in milliseconds
          // const expirationDate = new Date().getTime() + tokenExpirationTime;
          //Set auth cookie
          // console.log(response);
          
          this.router.navigateByUrl('/login');
        }
      });
  }

}
