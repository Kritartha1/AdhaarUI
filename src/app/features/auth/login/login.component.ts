import { Component, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { LoginRequest } from '../models/login-request';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { NgForm } from '@angular/forms';
import { retry } from 'rxjs';




@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @ViewChild('form', { static: true }) form!: NgForm; 

    model: LoginRequest;
    showEmailErr:boolean=false;
    showPassErr:boolean=false;
    login_success:string='Logged in successfully!';
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

        if(this.model.email===''&&this.model.password===''){
          alert("Please fill all the details");
          return;
        }else if (this.model.email==='') {
          alert("Email can't be empty");
          return;
        } else if (this.model.password==='') {
          alert("Password can't be empty");
          return;
        }

        // if(this.form.invalid){
        //   alert("Please fill all the fields");
        //   return;
        // }

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

              // console.log(response);
              this.router.navigateByUrl('/');
            }
            ,
            error:(err)=>{
              console.error(err);
            }
          });
      }
    
    
    


    


}
