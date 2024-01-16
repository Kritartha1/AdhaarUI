import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { LoginRequest } from '../models/login-request';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';




@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    model: LoginRequest;
    /**
     *
     */

    constructor(private authService: AuthService, private cookieService: CookieService, private router: Router) {
        this.model = {
          email: '',
          password: ''
        };
      }

      onFormSubmit(): void {
        this.authService.login(this.model)
          .subscribe({
            next: (response) => {
    
              // const tokenExpirationTime = 1 * 60 * 1000; // 15 minutes in milliseconds
              // const expirationDate = new Date().getTime() + tokenExpirationTime;
              //Set auth cookie
              // console.log(response);
              this.cookieService.set('Authorization', `Bearer ${response.jwtToken}`, undefined, '/', undefined, true, 'Strict');
              //this.cookieService.set('Authorization', `Bearer ${response.jwtToken}`, expirationDate, '/', undefined, true, 'Strict');
    
              //set user
              this.authService.setuser({
                email: response.email,
                roles: response.roles,
                id: response.id
              })
              this.router.navigateByUrl('/');
            }
          });
      }
    
    
    


    


}
