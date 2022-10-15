import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductUrls } from '../utils/urls.const';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}

  public addProduct(queryParams: Map<string, any>): Observable<any> {
    return this.http.post(ProductUrls.ADD_PRODUCT, queryParams.get('product'));
  }
  public fetchAllInvoice(queryParams: Map<string, any>): Observable<any> {
    let params = new HttpParams();
    // params = params.append('offset',queryParams.get('offset'));
    // params = params.append('limit',queryParams.get('limit').limit);
    return this.http.get(ProductUrls.FETCH_ALL_PRODUCT,{params:params});
  }
}
