import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, CanMatch, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanMatch, CanActivate{


  constructor(private service: AuthService,
    private router: Router) { }

  private checkAuthStatus(): Observable<boolean>{

    return this.service.checkAuthentication()
    .pipe(
      tap(isAuthenticated => {
        if(!isAuthenticated)
        this.router.navigate(['./auth/login'])
      })
    )

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    console.log('canActivate')
    console.log({route, state})
    throw new Error('Method not implemented.');
    return true;
  }
  canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean>{
    console.log('canMatch')
    console.log({route, segments})
    throw new Error('Method not implemented.');
    return true;
  }

}
