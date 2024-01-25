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
  invalidEmail: boolean = true;
  emailPattern: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

  passwordPattern: RegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  uppercaseError:boolean= false;
  lowercaseError:boolean = false;
  digitError:boolean = false;
  specialCharError:boolean = false;
  minlengthError: boolean = false;

 

  /**
   *
   */
  constructor(private authService: AuthService, private cookieService: CookieService, private router: Router,private fb: FormBuilder) {
    
    this.mod = {
      confirmPassword:''
    };
    this.model={
      username: '',
      password: '',
      roles:["User"]
      
    };
  this.fieldValidation['confirmPassword']=true;

   
    
  }
  validateEmail():void{
    this.invalidEmail=!this.emailPattern.test(this.model.username);
    
  }

  
  validateConfirmPassword(): void {
    this.fieldValidation['confirmPassword'] = this.model.password === this.mod.confirmPassword;
  }
  
  onConfirmPasswordInput(): void {
    this.validateConfirmPassword();
  }
 

  validatePassword():void{
    

    this.uppercaseError = !(/(?=.*?[A-Z])/.test(this.model.password));
    this.lowercaseError = !(/(?=.*?[a-z])/.test(this.model.password));
    this.digitError =! (/(?=.*?[0-9])/.test(this.model.password));
    this.specialCharError =!(/(?=.*?[#?!@$%^&*-])/.test(this.model.password)); 
    this.minlengthError = this.model.password.length < 8;

    this.onConfirmPasswordInput();
  }

 
  onFormSubmit(): void {

    if(this.model.password===''&&this.model.username===''&&this.mod.confirmPassword==='') {
      alert("Form can't be empty");
      return;
    }

    if(this.model.password===''){
      alert("password can't be empty");
      return;
    }
    if(this.model.username===''){
      alert("password can't be empty");
      return;
    }
    if(this.mod.confirmPassword!==this.model.password){
      alert("confirm password should match password");
      return;
    }

    if(this.form.invalid) {
      alert("Please put valid credentials");
      return;
    }
    if(!(this.fieldValidation['confirmPassword'])){
      alert('Password and confirm password does not match');
      return;
    }

    if(this.invalidEmail){
      alert('Please enter a valid email');
      return;
    }
    
    if(this.uppercaseError||this.lowercaseError||this.digitError||this.specialCharError||this.minlengthError 
    ){
      alert('Please enter valid password');
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
            this.clearForm();
            
        }
      });
  }

  clearForm():void{
    this.model={
      username: '',
      password: '',
      roles:["User"]
      
    };
    this.mod={
      confirmPassword: '',
    }

  }

}
