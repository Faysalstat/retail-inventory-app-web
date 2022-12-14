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
  public fetchAllProduct(queryParams: Map<string, any>): Observable<any> {
    let params = new HttpParams();
    params = params.append('offset',queryParams.get('offset'));
    params = params.append('limit',queryParams.get('limit'));
    return this.http.get(ProductUrls.FETCH_ALL_PRODUCT,{params:params});
  }

  public fetchAllProductForDropDown(): Observable<any> {
    return this.http.get(ProductUrls.FETCH_ALL_PRODUCT_FOR_DROPDOWN);
  }

  public fetchProductById(productId:any): Observable<any> {
    let params = new HttpParams();
    params = params.append('id',productId);
    return this.http.get(ProductUrls.FETCH_PRODUCT_BY_ID,{params:params});
  }
  public fetchAllPackagingCategory(): Observable<any> {
    return this.http.get(ProductUrls.FETCH_ALL_PACKAGING_CATEGORY);
  }
}
