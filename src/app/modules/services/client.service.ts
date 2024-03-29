import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountUrls, ClientUrls } from '../utils/urls.const';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private http: HttpClient) {}

  public addClient(queryParams: Map<string, any>): Observable<any> {
    return this.http.post(ClientUrls.ADD_CLIENT, queryParams.get('client'));
  }
  public getClientByContactNo(contactNo: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('contactNo', contactNo);
    return this.http.get(ClientUrls.FETCH_CLIENT_BY_CONTACT_NO, { params: params });
  }
  public getAllClient(queryParams: Map<string, any>): Observable<any> {
    let params = new HttpParams();
    params = params.append('clientType', queryParams.get("clientType"));
    params = params.append('contactNo', queryParams.get("contactNo")|| '');
    params = params.append('code', queryParams.get("code")|| '');
    params = params.append('shopName', queryParams.get("shopName")|| '');
    params = params.append('companyName', queryParams.get("companyName")|| '');
    params = params.append('brandName', queryParams.get("brandName")|| '');
    params = params.append('employeeId', queryParams.get("employeeId")|| '');
    params = params.append('designation', queryParams.get("designation")|| '');
    params = params.append('role', queryParams.get("role")|| '');
    return this.http.get(ClientUrls.FETCH_CLIENT_LIST_BY_TYPE, { params: params });
  }
  public getSupplyerByCode(queryParams: Map<string, any>): Observable<any> {
    let params = new HttpParams();
    params = params.append('code', queryParams.get("code"));
    params = params.append('id', queryParams.get("id"));
    return this.http.get(ClientUrls.FETCH_SUPPLYER_BY_CODE, { params: params });
  }
  public getCustomerById(id:any): Observable<any> {
    let params = new HttpParams();
    params = params.append('id', id);
    return this.http.get(ClientUrls.FETCH_CUSTOMER_BY_ID, { params: params });
  }

  public getPersonById(id:any): Observable<any> {
    let params = new HttpParams();
    params = params.append('id', id);
    return this.http.get(ClientUrls.FETCH_PERSON_BY_ID, { params: params });
  }
  public updateClient(queryParams: Map<string, any>): Observable<any> {
    return this.http.post(ClientUrls.UPDATE_CLIENT, queryParams.get('client'));
  }
   public getAccountHistoryListByAccountId(queryParams: Map<string, any>): Observable<any>{
    let params = new HttpParams();
    params = params.append('tnxType', queryParams.get('tnxType'));
    params = params.append('fromDate', queryParams.get('fromDate'));
    params = params.append('toDate', queryParams.get('toDate'));
    params = params.append('accountId', queryParams.get('accountId'));
    return this.http.get(ClientUrls.FETCH_ACCOUNT_HISTORY_LIST, { params: params });
   }

   public getEmployeeByCodeOrID(queryParams: Map<string, any>): Observable<any> {
    let params = new HttpParams();
    params = params.append('employeeId', queryParams.get("employeeId"));
    params = params.append('id', queryParams.get("id"));
    return this.http.get(ClientUrls.FETCH_EMPLOYEE_BY_CODE_OR_ID, { params: params });
  }

  public getAccountListByCategory(queryParams: Map<string, any>): Observable<any>{
    let params = new HttpParams();
    params = params.append('category', queryParams.get('category'));
    return this.http.get(AccountUrls.FETCH_ACCOUNT_LIST_BY_CATEGORY, { params: params });
   }
   public getAccountHistoryForProfitCalculation(queryParams: Map<string, any>): Observable<any>{
    let params = new HttpParams();
    params = params.append('fromDate', queryParams.get('fromDate'));
    params = params.append('toDate', queryParams.get('toDate'));
    return this.http.get(AccountUrls.FETCH_ACCOUNT_HISTORY_FOR_PROFIT_CALCULATION, { params: params });
   }
}
