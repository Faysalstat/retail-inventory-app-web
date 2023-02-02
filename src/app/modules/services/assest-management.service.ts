import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssetUrls } from '../utils/urls.const';

@Injectable({
  providedIn: 'root'
})
export class AssestManagementService {

  constructor(private http: HttpClient) {}
  public addAssets(queryParams: Map<string, any>): Observable<any> {
    console.log(queryParams.get('assetModel'));
    return this.http.post(AssetUrls.ADD_ASSET, queryParams.get('assetModel'));
  }
  public getAllAssets(id:any): Observable<any> {
    let params = new HttpParams();
    params = params.append('id', id);
    return this.http.get(AssetUrls.GET_ALL_ASSET, { params: params });
  }
}

