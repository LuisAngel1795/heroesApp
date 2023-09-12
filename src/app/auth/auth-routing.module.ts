import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
    ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule { }
