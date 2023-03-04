import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountUrls, ApprovalUrls, ConfigUrls } from '../utils/urls.const';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {}
  public approveTask(queryParams: Map<string, any>): Observable<any> {
    return this.http.post(ApprovalUrls.APPROVE_TASK, queryParams.get('payload'));
  }

  public getModules(roleName:any): Observable<any> {
    let params = new HttpParams();
    params = params.append('roleName', roleName);
    return this.http.get(ConfigUrls.GET_ROLE_WISE_MENU, { params: params });
  }

  public getGlBalanceByType(glType:any): Observable<any> {
    let params = new HttpParams();
    params = params.append('glType', glType);
    return this.http.get(AccountUrls.FETCH_GL_DETAILS_BY_TYPE, { params: params });
  }
  public getGlList(): Observable<any> {
    return this.http.get(AccountUrls.FETCH_GL_ACCOUNTS);
  }
}
