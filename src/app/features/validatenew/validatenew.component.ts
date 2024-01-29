import { Component, ViewChild } from '@angular/core';
import { ImageRequest } from '../models/Image.model';
import { ImageService } from '../services/image.service';
import { CookieService } from 'ngx-cookie-service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-validatenew',
  templateUrl: './validatenew.component.html',
  styleUrls: ['./validatenew.component.css']
})
export class ValidatenewComponent {
  @ViewChild('form', { static: true }) form!: NgForm; 
  model:ImageRequest;
  id: string | null;
  isLoading:boolean;
  formattedUID:string='';
  constructor(private imageService:ImageService,
    private cookieService: CookieService, 
    private router: Router,
    private toast:NgToastService
    ) {
   this.model={
     firstName:'',
     lastName:'',
     address:'',
     age:null,
     phone:'',
     locality:'',
     district:'',
     state:'',
     uid:'',
     file: {} as File
   };
   this.id="";
   this.isLoading=false;

   
 }

 checkValid():void{
   console.log(this.form);
 }
 checkAge(): void {
   
   if (this.model.age && this.model.age > 120) {
     this.model.age = null; // Set age to 100 if it's greater than 100
   }
 
 }

 showUID():void{
   if(this.model.uid.length===12){
     this.model.uid = this.model.uid.replace(/(.{4})/g, '$1 ').trim();
   }
 
   this.checkValid();
   
 }

 isValidAadhaar(aadhaar: string): boolean {
   const aadhaarRegex = /^[0-9]{4}\s?[0-9]{4}\s?[0-9]{4}$/;
   return aadhaarRegex.test(aadhaar);
 }
  
 

 // checkAge():void{
 //   if (this.model.age && this.model.age > 100) {
 //     const newAge:string = this.model.age.toString().slice(0, -1);
 //     this.model.age = newAge === '' ? null : Number(newAge);
 //   }
 // }

 onFileSelected(event: any): void {
   this.model.file = event.target.files[0];
 }

 onFormSubmit(): void {

   this.isLoading = true;
   //this.id = localStorage.getItem('user-Id');
   this.id = sessionStorage.getItem('user-Id');
   this.model.uid = this.model.uid.replace(/ /g, '');

   if(this.id){
     
     this.imageService.verify(this.id,this.model)
     .subscribe({
       next: (response) => {

         this.toast.success({detail:"SUCCESS",summary:'Successfully verified!',duration:2000,position:'topCenter'});
    

         console.log(response);
         
         this.router.navigateByUrl('/');
       }
       ,
       error:(err)=>{
         this.form.reset();
         this.toast.error({detail:"ERROR",summary:'Oops!Try again',duration:2000,position:'topCenter'});
         
    
         console.log(this.model)
         console.error(err);
       }
     });

   }else{
     this.toast.warning({detail:"ERROR",summary:'Please sign in!',duration:2000,position:'topCenter'});
     this.router.navigateByUrl('/login');
    
     // console.log(this.model)
     // console.log("Please sign in");
   }
   this.isLoading = false;
   
 }

}

