import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApprovalUrls, ClientUrls, ConfigUrls, InventoryUrls, TransactionUrls } from '../utils/urls.const';

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

  public doNewPaymentTransaction(queryParams: Map<string, any>): Observable<any> {
    return this.http.post(InventoryUrls.ISSUE_DO_PAYMENT, queryParams.get('payment'));
  }
  public issueSupplyOrderDelievery(queryParams: Map<string, any>): Observable<any> {
    return this.http.post(InventoryUrls.DO_SUPPLY_ORDER_DELIVERY, queryParams.get('delivery'));
  }
  public updateSupplyInvoice(queryParams: Map<string, any>): Observable<any> {
    return this.http.post(InventoryUrls.UPDATE_SUPPLY_INVOICE, queryParams.get('invoice'));
  }

  public updateSaleInvoice(queryParams: Map<string, any>): Observable<any> {
    return this.http.post(InventoryUrls.UPDATE_SALE_INVOICE, queryParams.get('invoice'));
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

  // sale 
  public fetchAllSaleInvoice(queryParams: Map<string, any>): Observable<any> {
    let params = new HttpParams();
    params = params.append('offset',queryParams.get('query').offset);
    params = params.append('limit',queryParams.get('query').limit);
    params = params.append('contactNo',queryParams.get('query').contactNo);
    params = params.append('invoiceNo',queryParams.get('query').invoiceNo);
    // params = params.append('doNo',queryParams.get('query').doNo);
    // params = params.append('isDue',queryParams.get('query').isDue);
    params = params.append('fromDate',queryParams.get('query').fromDate);
    params = params.append('toDate',queryParams.get('query').toDate);
    params = params.append('deliveryStatus',queryParams.get('query').deliveryStatus);
    return this.http.get(InventoryUrls.FETCH_SALE_ORDER_LIST,{params:params});
  }
  public fetchSaleInvoiceById(invoiceId:any): Observable<any> {
    let params = new HttpParams();
    params = params.append('invoiceId',invoiceId);
    return this.http.get(InventoryUrls.FETCH_SALE_ORDER_BY_ID,{params:params});
  }

// config service 
  public getConfigByName(configName:any): Observable<any> {
    let params = new HttpParams();
    params = params.append('configName',configName);
    return this.http.get(ConfigUrls.GET_CONFIG,{params:params});
  }


  public sendToApproval(queryParams: Map<string, any>): Observable<any> {
    return this.http.post(ApprovalUrls.SEND_TO_APPROVAL, queryParams.get('approval'));
  }
  public declineApproval(queryParams: Map<string, any>): Observable<any> {
    return this.http.post(ApprovalUrls.DECLINE_APPROVE_TASK, queryParams.get('task'));
  }
  public fetchTaskList(queryParams: Map<string, any>): Observable<any> {
    let params = new HttpParams();
    return this.http.get(ApprovalUrls.GET_TASK_LIST,{params:params});
  }
  public fetchTaskById(id:any): Observable<any> {
    let params = new HttpParams();
    params = params.append("taskId",id);
    return this.http.get(ApprovalUrls.GET_TASK_BY_ID,{params:params});
  }


  // Transactions 
  public doPaymentTransaction(queryParams: Map<string, any>): Observable<any> {
    return this.http.post(TransactionUrls.DO_PAYMENT_TRANSACTION, queryParams.get('payment'));
  }
}

