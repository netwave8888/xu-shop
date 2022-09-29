import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import { AppUser } from '../models/app-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // appUser$: BehaviorSubject<AppUser>;
  private loginUser$: BehaviorSubject<AppUser>;
  private loginUrl: string;

  constructor(private http: HttpClient) { 
    this.loginUrl = 'http://localhost:4201/user/email/';
    // this.http.get<AppUser[]>('/assets/appuser.json').subscribe(appusers => {
    //   this.appUsers = appusers;
    // });

    // console.log(this.appUsers);
  }
  
  getAuthUser(email : string) {
    this.http.get<AppUser>(this.loginUrl+email).subscribe(
        {next: (user) => { this.setAuthUser(user)},
         error: (error) => {console.log("error: " + error)}
    })
  }

  private setAuthUser(user : AppUser)  {
    this.loginUser$.next(user);
  }

  // getAppUsers() {
  // //   this.http.get<AppUser[]>('/assets/appuser.json').subscribe((appusers) => {
  // //     this.appUsers = appusers;
  // //     // console.log(this.appUsers.length);
  // //   },
  // //   () => {
  // //     console.error('Shopping cart data could not be loaded.');
  // //   });
  //   return this.appUsers;
  //  }

  // getLoginUser(email:string) {
  //   return this.loginUser;
  //  }
}
