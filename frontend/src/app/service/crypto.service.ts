import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor(private _httpClient: HttpClient) { }

  baseUrl: String = 'http://localhost:8080/crypto/';

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

  insertGraph(graph, token) {
    const body = new HttpParams()
      .set('crypto', graph.crypto)
      .set('start', graph.start)
      .set('end', graph.end)
    return this._httpClient.post(this.baseUrl + 'insertGraph',
    body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('Authorization', 'Bearer ' + token)
      });
  }

  getGraphList() {
    return this._httpClient.get(this.baseUrl + 'getGraph',
    {
        headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem('accessToken'))
    });
  }

  deleteGraph(id) {
    const body = new HttpParams()
      .set('id', id)
    return this._httpClient.post(this.baseUrl + 'deleteGraph',
    body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('Authorization', 'Bearer ' + localStorage.getItem('accessToken'))
      });
  }
}
