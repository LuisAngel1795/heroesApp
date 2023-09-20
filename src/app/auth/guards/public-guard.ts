import { CanMatch, CanActivate, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class PublicGuard implements CanMatch, CanActivate {


  constructor(
    private service: AuthService,
    private router: Router
  ) { }

  checkAuthenticated():Observable<boolean>{
    return this.service.checkAuthentication()
    .pipe(
      tap(isauthenticated =>{
        if(isauthenticated)
        this.router.navigate(['./'])
      }),
      map(isAuthenticated => !isAuthenticated)
    )
  }



  canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    return this.checkAuthenticated();

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    return this.checkAuthenticated();
  }

}
