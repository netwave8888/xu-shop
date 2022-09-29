import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppUser } from 'src/app/shared/models/app-user';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  isAuthenticated : boolean = false;
  user : AppUser = {} as null;
  isAdmin : boolean;
  totalItemsCount : Observable<number> = of(10); 

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.loginUser$.subscribe(
      user => {this.isAuthenticated = user.isLogin, this.user = user}
    );
    if ( this.user ) {
      // this.isAuthenticated = true;
      // this.totalItemsCount = this.shoppingCartService.getCount();
      this.isAdmin = (this.user.role == 'admin');
    }
  }

  onLogOut() {
    this.authService.logout();
  }

}
