import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/authService';
import { NotificationService } from '../services/notification-service.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivateChild {
  constructor(
    private router:Router,
    private authService: AuthService,
    private notificationService : NotificationService
  ){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const idToken = localStorage.getItem('token');
      return this.verify(idToken);
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const idToken = localStorage.getItem('token');
    return this.verifyAdmin(idToken);
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
    if (authenticated.body.userRole == 'ADMIN') {
      console.log('Welcome to admin panel');
    } else if (authenticated.body.userRole == 'MANAGER') {
      console.log('Welcome to manager panel');
      this.notificationService.showErrorMessage("WARNING!!","You Are Not Permited To Access Admin Panel","OK",1000);
      this.router.navigate(['home']);
    }else if (authenticated.body.userRole == 'SALER') {
      console.log('Welcome to manager panel');
      this.notificationService.showErrorMessage("WARNING!!","You Are Not Permited To Access Admin Panel","OK",1000);
      this.router.navigate(['home']);
    } else {
      this.notificationService.showErrorMessage("WARNING!!","You Are Not Logged In","OK",1000);
      console.log('You are not permited to admin panel');
      this.router.navigate(['auth']);
    }
    return authenticated.body.status;
  }
}
