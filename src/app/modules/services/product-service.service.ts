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
  public fetchAllProductCategory(): Observable<any> {
    return this.http.get(ProductUrls.FETCH_ALL_PRODUCT_CATEGORY);
  }
  public fetchAllUnitType(): Observable<any> {
    return this.http.get(ProductUrls.FETCH_ALL_UNIT_TYPE);
  }
  public fetchProductByCode(queryParams: Map<string, any>): Observable<any> {
    let params = new HttpParams();
    params = params.append('code',queryParams.get('code'));
    params = params.append('name',queryParams.get('name'));
    return this.http.get(ProductUrls.FETCH_PRODUCT_BY_CODE,{params:params});
  }

  public addProductCategory(queryParams: Map<string, any>): Observable<any> {
    return this.http.post(ProductUrls.ADD_PRODUCT_CATEGORY, queryParams.get('model'));
  }
  public addPackagingCategory(queryParams: Map<string, any>): Observable<any> {
    return this.http.post(ProductUrls.ADD_PACKAGING_CATEGORY, queryParams.get('model'));
  }
  public addUnitType(queryParams: Map<string, any>): Observable<any> {
    return this.http.post(ProductUrls.ADD_UNIT_TYPE, queryParams.get('model'));
  }
// Delete 
  public deleteUnitType(unitId:any): Observable<any> {
    return this.http.post(ProductUrls.DELETE_UNIT_TYPE, {unitId:unitId});
  }
  public deleteProductCategory(categoryId:any): Observable<any> {
    return this.http.post(ProductUrls.DELETE_PRODUCT_CATEGORY, {categoryId:categoryId});
  }
  public deletePackagingCategory(categoryId:any): Observable<any> {
    return this.http.post(ProductUrls.DELETE_PACKAGING_CATEGORY, {categoryId:categoryId});
  }
}
