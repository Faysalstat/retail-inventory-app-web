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
  public getSupplyerByCode(code: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('code', code);
    return this.http.get(ClientUrls.FETCH_SUPPLYER_BY_CODE, { params: params });
  }
}
