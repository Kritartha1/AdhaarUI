// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { CookieService } from 'ngx-cookie-service';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { environment } from 'src/environments/environment.development';
// import { LoginRequest } from '../models/login-request';
// import { LoginResponse } from '../models/login-response.model';
// import { User } from '../models/user.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   $user = new BehaviorSubject<User | undefined>(undefined);

//   constructor(private http: HttpClient, private cookieService: CookieService) { }

//   login(request: LoginRequest): Observable<LoginResponse> {
//     return this.http.post<LoginResponse>(`${environment.apiBaseUrl}/api/Auth/Login`, {
//       username: request.email,
//       password: request.password
//     });
//   }

//   setuser(user: User): void {
//     this.$user.next(user);
//     localStorage.setItem('user-email', user.email);
//     localStorage.setItem('user-roles', user.roles.join(','));
//     localStorage.setItem('user-Id', user.id);
//   }

//   user(): Observable<User | undefined> {
//     return this.$user.asObservable();
//   }

//   getuser(): User | undefined {
//     const email = localStorage.getItem('user-email');
//     const roles = localStorage.getItem('user-roles');
//     const id = localStorage.getItem('user-Id');

//     if (email && roles && id) {
//       const user: User = {
//         email: email,
//         roles: roles.split(','),
//         id: id
//       };

//       return user;
//     }
//     return undefined;
//   }

//   logout(): void {
//     localStorage.clear();
//     this.cookieService.delete('Authorization', '/');
//     this.$user.next(undefined);

//   }
// }
