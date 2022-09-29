import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';
import { AppUser } from '../models/app-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUser$: BehaviorSubject<AppUser>;
  private authUser: AppUser;
  private loginUrl: string;
  authUser$: any;

  constructor(private http: HttpClient, private router: Router) { 
    this.loginUrl = 'http://localhost:4201/user/email/';
    this.loginUser$ = new BehaviorSubject<AppUser>({id:'', name:'', email:'', role: '', isLogin:false});
  }

  getAuthUser(email : string) {
    this.http.get<AppUser>(this.loginUrl+email).subscribe(
        {next: (user) => { this.authUser = user, this.loginUser$.next(user)},
         error: (error) => {console.log("error: " + error)}
    })
  }

  private setAuthUser(user : AppUser)  {
    this.loginUser$.next(user);
  }

  login(email: string) {
    this.http.get<AppUser>(this.loginUrl+email).subscribe(
      {next: (user) => { this.authUser = user, this.authUser.isLogin=true, this.loginUser$.next(user)},
       error: (error) => {console.log("error: " + error)}
    });
    return this.loginUser$;
  }

  logout() {
    this.authUser.isLogin = false;
  }

}
