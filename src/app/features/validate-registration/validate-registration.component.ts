import { Component } from '@angular/core';
import { ImageRequest } from '../models/Image.model';
import { ImageService } from '../services/image.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-validate-registration',
  templateUrl: './validate-registration.component.html',
  styleUrls: ['./validate-registration.component.css']
})
export class ValidateRegistrationComponent {

  model:ImageRequest;
  id: string | null;
  isLoading:boolean;
  /**
   *
   */
 

  /**
   *
   */
  constructor(private imageService:ImageService, private cookieService: CookieService, private router: Router) {
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

  onFileSelected(event: any): void {
    this.model.file = event.target.files[0];
  }

  onFormSubmit(): void {
    this.isLoading = true;
    this.id = localStorage.getItem('user-Id');
    if(this.id){
      

      this.imageService.verify(this.id,this.model)
      .subscribe({
        next: (response) => {

          console.log(response);
          
          this.router.navigateByUrl('/');
        }
        ,
        error:(err)=>{
          console.log(this.model)
          console.error(err);
        }
      });

    }else{
      console.log("Please sign in");
    }
    this.isLoading = false;
    
  }

}
