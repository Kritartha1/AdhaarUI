import { Component, OnInit, ViewChild } from '@angular/core';
import { SignupRequest } from '../models/signup-request';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';


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
  strongPassword:boolean = false;
  showPasswordStrength:boolean=false;

 

  /**
   *
   */
  constructor(private authService: AuthService,
     private cookieService: CookieService,
      private router: Router,
      private fb: FormBuilder,
      private toast:NgToastService
      ) {
    
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

  onPasswordStrengthChanged(event: boolean) {
    this.strongPassword = event;
  }

 

 
  onFormSubmit(): void {
   
    // this.router.navigateByUrl('/');
   

    if(this.model.password===''&&this.model.username===''&&this.mod.confirmPassword==='') {
      this.toast.warning({detail:"ERROR",summary:'Please fill all the details!',duration:2000,position:'topCenter'});
      return;
    }

    if(this.model.password===''){
      this.toast.warning({detail:"ERROR",summary:'Password can not be empty!',duration:2000,position:'topCenter'});
      return;
    }
    if(this.model.username===''){
      this.toast.warning({detail:"ERROR",summary:'Email can not be empty',duration:2000,position:'topCenter'});
      return;
    }
    if(this.mod.confirmPassword!==this.model.password){
      this.toast.warning({detail:"MISMATCH",summary:'confirm password should match password',duration:2000,position:'topCenter'});
      // alert("confirm password should match password");
      return;
    }

    if(this.form.invalid) {
      this.toast.warning({detail:"ERROR",summary:'Please put valid credentials',duration:2000,position:'topCenter'});
      //alert("Please put valid credentials");
      return;
    }
    if(!(this.fieldValidation['confirmPassword'])){
      this.toast.warning({detail:"MISMATCH",summary:'confirm password should match password',duration:2000,position:'topCenter'});
      // alert("Password and confirm password does not match");
      return;
    }

    if(this.invalidEmail){
      this.toast.warning({detail:"INVALID",summary:'Please enter a valid email',duration:2000,position:'topCenter'});
      // alert('Please enter a valid email');
      return;
    }
    
    if(this.uppercaseError||this.lowercaseError||this.digitError||this.specialCharError||this.minlengthError 
    ){
      this.toast.warning({detail:"INVALID",summary:'Please enter a valid password',duration:2000,position:'topCenter'});
      return;
    }
    

    

    this.authService.register(this.model)
      .subscribe({
        next: (response) => {

          console.log(this.model);
          console.log(response);
          this.toast.success({detail:"SUCCESS",summary:'Registered successfully! Please login now',duration:2000, position:'topCenter'});
          this.router.navigateByUrl('/login');
        }
        ,
        error:(err)=>{


          console.log(this.model);
          this.toast.error({detail:"ERROR",summary:'Oops!Try again',duration:2000,position:'topCenter'});
           // alert("Oops!Try again");
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
