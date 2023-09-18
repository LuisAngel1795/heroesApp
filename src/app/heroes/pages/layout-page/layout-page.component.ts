import { Component } from '@angular/core';
import { User } from 'src/app/auth/interfaces/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent {
  constructor(private service: AuthService){}

  get currentUser():User | undefined{
    return this.service.currentUser;
  }

  public sideBarItems=[
    {label:'Listado', icon:'label', url:'./list'},
    {label:'Añadir', icon:'add', url:'./new-hero'},
    {label:'Buscar', icon:'search', url:'./search'}
  ]

  onLogout():void{
    this.service.logout;
  }

}
