import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title="Xu-Shop";
  email: string = 'marvin@netwave.com';
  isLogin: boolean = false;
  constructor(private authService: AuthService) {
    this.authService.login(this.email).subscribe(
      user => {this.isLogin = user.isLogin, console.log(this.isLogin)}
    );
  }
}
