import { Component, OnInit, ViewChild } from '@angular/core';
import { SignupRequest } from '../models/signup-request';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  mod:{confirmPassword:string};
  model:SignupRequest;
  // @ViewChild('form')
  // form!: NgForm;
  password: string = '';
  passwordError: string = '';

  /**
   *
   */
  constructor(private authService: AuthService, private cookieService: CookieService, private router: Router) {
    
    this.mod = {
      confirmPassword:''
    };
    this.model={
      username: '',
      password: '',
      roles:["User"]
      
    };
  }
 



  validatePassword() {
    const minLength = 8;
    const maxLength = 16;

    if (this.model.password.length < minLength || this.model.password.length > maxLength) {
      this.passwordError = `Password must be between ${minLength} and ${maxLength} characters.`;
    } else {
      this.passwordError = '';
      // Additional validation logic can be added here
    }
  }

  onFormSubmit(): void {

    this.authService.register(this.model)
      .subscribe({
        next: (response) => {

          console.log(this.model);
          console.log(response);
           this.router.navigateByUrl('/login');
        }
        ,
        error:(err)=>{
          console.log(this.model);
            alert("Oops!Try again");
            this.model={
              username: '',
              password: '',
              roles:["User"]
              
            };
        }
      });
  }

}
