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
    params = params.append('tnxType',queryParams.get('tnxType'));
    params = params.append('isCredit',queryParams.get('isCredit'));
    params = params.append('isDebit',queryParams.get('isDebit'));
    return this.http.get(ReportUrls.TRANSACTION_REPORT,{params:params});
  }

  public fetchAccountHistoryRecord(queryParams: Map<string, any>): Observable<any> {
    let params = new HttpParams();
    // params = params.append('offset',queryParams.get('offset'));
    // params = params.append('limit',queryParams.get('limit'));
    params = params.append('tnxType',queryParams.get('tnxType'));
    // params = params.append('isCredit',queryParams.get('isCredit'));
    // params = params.append('isDebit',queryParams.get('isDebit'));
    return this.http.get(ReportUrls.ACCOUNT_HISTORY_REPORT,{params:params});
  }
}
