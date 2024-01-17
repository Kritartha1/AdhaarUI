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
      file: new File([], 'placeholder.txt', { type: 'text/plain' })
    };
    this.id="";

    
  }

  onFormSubmit(): void {
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
          console.error(err);
        }
      });

    }
    
  }

}
