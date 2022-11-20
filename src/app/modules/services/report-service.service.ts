import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReportUrls } from '../utils/urls.const';

@Injectable({
  providedIn: 'root'
})
export class ReportServiceService {
  
  constructor(private http: HttpClient) {}

  public fetchTransactionRecord(queryParams: Map<string, any>): Observable<any> {
    let params = new HttpParams();
    // params = params.append('offset',queryParams.get('offset'));
    // params = params.append('limit',queryParams.get('limit'));
    return this.http.get(ReportUrls.TRANSACTION_REPORT,{params:params});
  }
}
