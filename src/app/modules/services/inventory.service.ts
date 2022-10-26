import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientUrls, InventoryUrls } from '../utils/urls.const';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient) {}

  public issueSalesOrder(queryParams: Map<string, any>): Observable<any> {
    return this.http.post(InventoryUrls.ISSUE_SALES_ORDER, queryParams.get('invoice'));
  }
  public issueBuyOrder(queryParams: Map<string, any>): Observable<any> {
    return this.http.post(InventoryUrls.ISSUE_SUPPLY_ORDER, queryParams.get('order'));
  }
  public issueSupplyOrderDelievery(queryParams: Map<string, any>): Observable<any> {
    return this.http.post(InventoryUrls.DO_SUPPLY_ORDER_DELIVERY, queryParams.get('delivery'));
  }
  public fetchAllSupplyInvoice(queryParams: Map<string, any>): Observable<any> {
    let params = new HttpParams();
    params = params.append('offset',queryParams.get('query').offset);
    params = params.append('limit',queryParams.get('query').limit);
    // params = params.append('contactNo',queryParams.get('query').contactNo);
    // params = params.append('invoiceNo',queryParams.get('query').invoiceNo);
    // params = params.append('doNo',queryParams.get('query').doNo);
    // params = params.append('isDue',queryParams.get('query').isDue);
    // params = params.append('fromDate',queryParams.get('query').fromDate);
    // params = params.append('toDate',queryParams.get('query').toDate);
    // params = params.append('deliveryStatus',queryParams.get('query').deliveryStatus);
    return this.http.get(InventoryUrls.FETCH_SUPPLY_ORDER_LIST,{params:params});
  }
  public fetchSupplyInvoiceById(invoiceId:any): Observable<any> {
    let params = new HttpParams();
    params = params.append('invoiceId',invoiceId);
    return this.http.get(InventoryUrls.FETCH_SUPPLY_ORDER_BY_ID,{params:params});
  }
}

