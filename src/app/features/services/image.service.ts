import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { ImageRequest } from '../models/Image.model';
import { SignupResponse } from '../auth/models/signup-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  verify(id:string,request:ImageRequest):Observable<SignupResponse>{

    const formData = new FormData();

    // Append properties of the ImageRequest to FormData
    formData.append('firstName', request.firstName);
    formData.append('lastName', request.lastName);
    formData.append('address', request.address);
    formData.append('age', request.age?.toString() || '');
    formData.append('phone', request.phone);
    formData.append('locality', request.locality);
    formData.append('district', request.district);
    formData.append('state', request.state);
    formData.append('uid', request.uid);
    formData.append('file', request.file);

    return this.http.post<SignupResponse>(`${environment.apiBaseUrl}/api/Auth/Create/${id}`, formData);

    
  }

  // createImage(id: string, formData: FormData): Observable<any> {
  //   const url = `${this.apiUrl}/Auth/Create/${id}`;
    
  //   return this.http.post(url, formData).pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       console.error('Error creating image:', error);
  //       return throwError(error);
  //     })
  //   );
  // }
}
