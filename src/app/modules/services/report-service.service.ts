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

  public fetchOrderListRecord(queryParams:any): Observable<any> {
    let params = new HttpParams();
    params = params.append('deliveryStatus',queryParams.deliveryStatus);
    params = params.append('invoiceNo',queryParams.invoiceNo);
    params = params.append('orderNo',queryParams.orderNo);
    params = params.append('offset',queryParams.offset);
    params = params.append('limit',queryParams.limit);
    params = params.append('productCode',queryParams.productCode);
    return this.http.get(ReportUrls.SALE_ORDER_REPORT,{params:params});
  }

  public fetchSupplyOrderListRecord(queryParams:any): Observable<any> {
    let params = new HttpParams();
    params = params.append('deliveryStatus',queryParams.deliveryStatus);
    params = params.append('invoiceNo',queryParams.invoiceNo);
    params = params.append('orderNo',queryParams.orderNo);
    params = params.append('offset',queryParams.offset);
    params = params.append('limit',queryParams.limit);
    params = params.append('productCode',queryParams.productCode);
    return this.http.get(ReportUrls.SUPPLY_ORDER_REPORT,{params:params});
  }
}
