import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [
  ]
})
export class LoginPageComponent {
  constructor(private servicio: AuthService,
    private router: Router){}

  onLogin():void{

    this.servicio.login('luisgsila1704@gmail.com','pass123')
    .subscribe(
      user => {
              this.router.navigate(['/'])
      });

  }

}
