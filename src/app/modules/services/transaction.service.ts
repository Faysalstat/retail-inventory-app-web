import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionUrls } from '../utils/urls.const';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) {}

  public fetchAllTransactionReason(): Observable<any> {
    let params = new HttpParams();
    let clientId = localStorage.getItem('clientId') || "";
    params = params.append('clientId',clientId);
    return this.http.get(TransactionUrls.FETCH_TRANSACTION_REASONS,{params:params});
  }

  public addTransactionReason(queryParams: Map<string, any>): Observable<any> {
    let model =  queryParams.get('model');
    model.clientId = localStorage.getItem('clientId') || "";
    return this.http.post(TransactionUrls.ADD_TNX_REASON,model);
  }
  public deleteTransactionReason(id:any): Observable<any> {
    return this.http.post(TransactionUrls.DELETE_TNX_REASON,{id:id});
  }
  public doExpense(queryParams: Map<string, any>): Observable<any> {
    let model =  queryParams.get('expenseModel');
    model.clientId = localStorage.getItem('clientId') || "";
    return this.http.post(TransactionUrls.DO_EXPENSE_TRANSACTION,model);
  }
  
  public doDeposit(queryParams: Map<string, any>): Observable<any> {
    let model =  queryParams.get('depositModel');
    model.clientId = localStorage.getItem('clientId') || "";
    return this.http.post(TransactionUrls.DO_DEPOSIT_TRANSACTION,model);
  }
  public paySalary(queryParams: Map<string, any>): Observable<any> {
    let model =  queryParams.get('salaryModel');
    model.clientId = localStorage.getItem('clientId') || "";
    return this.http.post(TransactionUrls.DO_SALARY_TRANSACTION,model);
  }

  public payInstallment(queryParams: Map<string, any>): Observable<any> {
    let model =  queryParams.get('installment');
    model.clientId = localStorage.getItem('clientId') || "";
    return this.http.post(TransactionUrls.DO_LOAN_INSTALLMENT_TRANSACTION,model);
  }
}
