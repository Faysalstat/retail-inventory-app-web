import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationGuardService } from './authentication-guard.service';

@Injectable({
  providedIn: 'root',
})
export class AppAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthenticationGuardService
  ) {}
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    console.log(localStorage.getItem('token'));
    const idToken = localStorage.getItem('token');
    return this.verifyAdmin(idToken);
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log(localStorage.getItem('token'));
    const idToken = localStorage.getItem('token');
    return this.verify(idToken);
  }
  async verify(token: any) {
    if (!token) {
      this.router.navigate(['auth']);
    }
    let authenticated = await this.authService.isLoggedIn(token);
    if (!authenticated.body.status) {
      this.router.navigate(['auth']);
    }
    return authenticated.body.status;
  }
  async verifyAdmin(token: any) {
    if (!token) {
      this.router.navigate(['auth']);
    }
    let authenticated = await this.authService.isLoggedIn(token);
    if(authenticated){
      if (authenticated.body.userRole == 'ADMIN') {
        console.log('Welcome to admin panel');
      } else if (authenticated.body.userRole == 'MANAGER') {
        console.log('Welcome to manager panel');
        this.router.navigate(['home']);
      } else {
        console.log('You are not permited to admin panel');
        this.router.navigate(['auth']);
      }
      return authenticated.body.status;
    }
    
  }
}
