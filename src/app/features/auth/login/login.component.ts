import { Component, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { LoginRequest } from '../models/login-request';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { NgForm } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';





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
    passwordInputType: string = 'password';
    /**
     *
     */

    constructor(private authService: AuthService, private cookieService: CookieService, private router: Router,private toast:NgToastService) {
        this.model = {
          email: '',
          password: ''
        };

       
      }

      togglePasswordVisibility():void {
        this.passwordInputType = (this.passwordInputType === 'password') ? 'text' : 'password';
      }


    

      onFormSubmit(): void {

        if(this.model.email===''&&this.model.password===''){
          this.toast.warning({detail:"ERROR",summary:'Please fill all the details!',duration:2000,position:'topCenter'});
          return;
        }else if (this.model.email==='') {
          this.toast.warning({detail:"ERROR",summary:'Email can not be empty!',duration:2000,position:'topCenter'});
          
          return;
        } else if (this.model.password==='') {
          this.toast.warning({detail:"ERROR",summary:'Password can not be empty',duration:2000,position:'topCenter'});
          
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

              this.toast.success({detail:"SUCCESS",summary:'Logged in successfully!',duration:3000, position:'topCenter'});

              // console.log(response);
              this.router.navigateByUrl('/');
            }
            ,
            error:(err)=>{
              this.toast.error({detail:"Log in failed",summary:'Oops!Please try again',duration:2000,position:'topCenter'});
              //console.error(err);
            }
          });
      }
    
    
    


    


}
