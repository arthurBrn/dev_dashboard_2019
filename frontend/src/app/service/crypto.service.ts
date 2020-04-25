import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor(private _httpClient: HttpClient) { }

  baseUrl: String = 'http://127.0.0.1:8080/crypto/';

  getPublicServices() {
    return ('public services');
  }

  getGraph(datas) {
      const url = this.baseUrl + 'graph';
      let params = new HttpParams();
      params = params.append('start', datas.start);
      params = params.append('end', datas.end);
      params = params.append('crypto', datas.crypto);

      return this._httpClient.get(url, {params: params});
  }

  getList() {
      const url = this.baseUrl + 'list';
      return this._httpClient.get(url);
  }

  rate() {
      const url = this.baseUrl + 'rate';
      return this._httpClient.get(url);
  }

  insertConfGraph(start, end) {
    const body = new HttpParams()
      .set('start', start)
      .set('end', end)
    return this._httpClient.post(this.baseUrl + 'insertGraph',
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('Authorization', 'Bearer ' + userToken)
      });
  }

  getCryptoWidgets(userToken, tableName) {
    const body = new HttpParams()
      .set('tableName', tableName);
    return this._httpClient.post(this.baseUrl + 'widgets', body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('Authorization', 'Bearer ' + userToken)
      });
  }
}
