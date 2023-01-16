import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionUrls } from '../utils/urls.const';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) {}

  public fetchAllTransactionReason(): Observable<any> {
    return this.http.get(TransactionUrls.FETCH_TRANSACTION_REASONS);
  }

  public addTransactionReason(queryParams: Map<string, any>): Observable<any> {
    return this.http.post(TransactionUrls.ADD_TNX_REASON, queryParams.get('model'));
  }
  public deleteTransactionReason(id:any): Observable<any> {
    return this.http.post(TransactionUrls.DELETE_TNX_REASON,{id:id});
  }
  public doExpense(queryParams: Map<string, any>): Observable<any> {
    return this.http.post(TransactionUrls.ADD_TNX_REASON, queryParams.get('expenseModel'));
  }
}
