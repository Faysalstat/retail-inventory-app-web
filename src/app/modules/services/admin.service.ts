import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApprovalUrls } from '../utils/urls.const';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {}
  public approveTask(queryParams: Map<string, any>): Observable<any> {
    return this.http.post(ApprovalUrls.APPROVE_TASK, queryParams.get('payload'));
  }
}
