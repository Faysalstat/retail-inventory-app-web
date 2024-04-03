import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './authService';
import { NotificationService } from './notification-service.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivateChild{
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
      return this.verifyAdmin(idToken);
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
    if (!authenticated.body.status) {
      this.router.navigate(['auth']);
    }
    if (authenticated.body.userRole == 'ADMIN') {
      console.log('Welcome to admin panel');
    } else if (authenticated.body.userRole == 'MANAGER' || authenticated.body.userRole == 'SALER') {
      console.log('Welcome to manager panel');
      this.notificationService.showErrorMessage("WARNING!!","You are Not an Admin. Please log in as an ADMIN.","OK",2000);
      this.router.navigate(['admin']);
    } else {
      this.notificationService.showErrorMessage("WARNING!!","You Are Not Logged In","OK",2000);
      console.log('You are not permited to admin panel');
      this.router.navigate(['admin']);
    }
    return authenticated.body.status;
  }
}
