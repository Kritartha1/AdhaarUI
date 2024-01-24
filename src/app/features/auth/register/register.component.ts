import { Component, OnInit, ViewChild } from '@angular/core';
import { SignupRequest } from '../models/signup-request';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  @ViewChild('form', { static: true }) form!: NgForm; 

  mod:{confirmPassword:string};
  model:SignupRequest;
  // @ViewChild('form')
  // form!: NgForm;
  password: string = '';
  passwordError: string = '';
  fieldValidation: { [key: string]: boolean } = {};

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

  onUsernameChange() {
    
    this.fieldValidation['username'] = !this.model.username.trim();
  }

  onPasswordChange() {
    
    this.validatePassword();
    this.fieldValidation['password'] = !this.model.password.trim();
  }

  onConfirmPasswordChange() {
    
    this.fieldValidation['confirmPassword'] = !this.mod.confirmPassword.trim();
  }

  onFormSubmit(): void {
    this.fieldValidation = {};

    this.fieldValidation['username'] = !this.model.username.trim() ;
    this.fieldValidation['password'] = !this.model.password.trim() ;
    this.fieldValidation['confirmPassword'] = !this.mod.confirmPassword.trim();
    


    // Check additional validations (e.g., password length)
    this.validatePassword();

    // Check if any field is blank or has validation errors
    if (Object.values(this.fieldValidation).some(value => value) || this.form.invalid) {
      console.log("Please fill all the required fields");
      return;
    }


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
