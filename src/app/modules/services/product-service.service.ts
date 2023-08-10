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
    let productModel = queryParams.get('product');
    productModel.clientId = localStorage.getItem('clientId') || "";
    return this.http.post(ProductUrls.ADD_PRODUCT,productModel);
  }
  public fetchAllProduct(queryParams: Map<string, any>): Observable<any> {
    let params = new HttpParams();
    params = params.append('offset',queryParams.get('offset'));
    params = params.append('limit',queryParams.get('limit'));
    params = params.append('brandName',queryParams.get('brandName').trim());
    params = params.append('categoryName',queryParams.get('categoryName').trim());
    params = params.append('code',queryParams.get('code').trim());
    params = params.append('clientId',localStorage.getItem('clientId') || "");
    return this.http.get(ProductUrls.FETCH_ALL_PRODUCT,{params:params});
  }

  public fetchAllProductForDropDown(): Observable<any> {
    let params = new HttpParams();
    let clientId = localStorage.getItem('clientId') || "";
    params = params.append('clientId',clientId);
    return this.http.get(ProductUrls.FETCH_ALL_PRODUCT_FOR_DROPDOWN,{params:params});
  }

  public fetchProductById(productId:any): Observable<any> {
    let params = new HttpParams();
    params = params.append('id',productId);
    return this.http.get(ProductUrls.FETCH_PRODUCT_BY_ID,{params:params});
  }
  public fetchAllPackagingCategory(): Observable<any> {
    let params = new HttpParams();
    let clientId = localStorage.getItem('clientId') || "";
    params = params.append('clientId',clientId);
    return this.http.get(ProductUrls.FETCH_ALL_PACKAGING_CATEGORY,{params:params});
  }
  public fetchAllProductCategory(): Observable<any> {
    let params = new HttpParams();
    let clientId = localStorage.getItem('clientId') || "";
    params = params.append('clientId',clientId);
    return this.http.get(ProductUrls.FETCH_ALL_PRODUCT_CATEGORY,{params:params});
  }
  public fetchAllUnitType(): Observable<any> {
    let params = new HttpParams();
    let clientId = localStorage.getItem('clientId') || "";
    params = params.append('clientId',clientId);
    return this.http.get(ProductUrls.FETCH_ALL_UNIT_TYPE,{params:params});
  }
  public fetchProductByCode(queryParams: Map<string, any>): Observable<any> {
    let params = new HttpParams();
    params = params.append('code',queryParams.get('code').trim());
    params = params.append('name',queryParams.get('name').trim());
    params = params.append('clientId',localStorage.getItem('clientId') || "");
    return this.http.get(ProductUrls.FETCH_PRODUCT_BY_CODE,{params:params});
  }
  public fetchAllBrandName(): Observable<any> {
    let params = new HttpParams();
    let clientId = localStorage.getItem('clientId') || "";
    params = params.append('clientId',clientId);
    return this.http.get(ProductUrls.FETCH_PRODUCT_BRAND_NAME,{params:params});
  }
  public addProductCategory(queryParams: Map<string, any>): Observable<any> {
    let productCategoryModel =  queryParams.get('model');
    productCategoryModel.clientId = localStorage.getItem('clientId') || "";
    return this.http.post(ProductUrls.ADD_PRODUCT_CATEGORY,productCategoryModel);
  }
  public addPackagingCategory(queryParams: Map<string, any>): Observable<any> {
    let model =  queryParams.get('model');
    model.clientId = localStorage.getItem('clientId') || "";
    return this.http.post(ProductUrls.ADD_PACKAGING_CATEGORY,model);
  }
  public addUnitType(queryParams: Map<string, any>): Observable<any> {
    let model =  queryParams.get('model');
    model.clientId = localStorage.getItem('clientId') || "";
    return this.http.post(ProductUrls.ADD_UNIT_TYPE,model);
  }
  public addBrnadName(queryParams: Map<string, any>): Observable<any> {
    let model =  queryParams.get('model');
    model.clientId = localStorage.getItem('clientId') || "";
    return this.http.post(ProductUrls.ADD_BRAND_NAME,model);
  }
// Delete 
  public deleteUnitType(unitId:any): Observable<any> {
    return this.http.post(ProductUrls.DELETE_UNIT_TYPE, {unitId:unitId});
  }
  public deleteBrandName(unitId:any): Observable<any> {
    return this.http.post(ProductUrls.DELETE_BRAND_NAME, {unitId:unitId});
  }
  public deleteProductCategory(categoryId:any): Observable<any> {
    return this.http.post(ProductUrls.DELETE_PRODUCT_CATEGORY, {categoryId:categoryId});
  }
  public deletePackagingCategory(categoryId:any): Observable<any> {
    return this.http.post(ProductUrls.DELETE_PACKAGING_CATEGORY, {categoryId:categoryId});
  }
}
