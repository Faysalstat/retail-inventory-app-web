import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientUrls } from '../utils/urls.const';

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
  public getAllClient(clientType: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('clientType', clientType);
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
}
