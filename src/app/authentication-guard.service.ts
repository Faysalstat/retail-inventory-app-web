import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuardService {
  constructor(
    private router: Router,
    private http:HttpClient) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // if (false) {
    //   return true;
    // } 
    // else {
    //   this.router.navigate(['auth'], {
    //     queryParams: {
    //       return: state.url
    //     }
    //   });
    //   return false;
    // }

    // remove after implementation 
    return true
  }
  public isLoggedIn(token:any):Promise<any>{
    let params = new HttpParams();
    params = params.append("token",token);
    // return this.http.get(Urls.CHECK_IS_LOGGEDIN,{params:params}).toPromise();
    return this.http.get("localhost:3000/auth/isloggedin",{params:params}).toPromise();
  }
}
