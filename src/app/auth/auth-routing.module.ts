import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterComponent } from './pages/register/register.component';
import { PublicGuard } from './guards/public-guard';

const routes: Routes = [
  {
    path:'',
    component: LayoutPageComponent,
    children:[
      {path:'login', component:LoginPageComponent},
      {path:'register', component: RegisterComponent},
      {path:'**', redirectTo:'login'}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
    ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule { }
