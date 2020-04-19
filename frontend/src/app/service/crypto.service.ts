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

  getGraph() {
      const url = this.baseUrl + 'graph';
      let params = new HttpParams();
      params = params.append('start', '1584616092675');
      params = params.append('end', '1587290892675');
      params = params.append('crypto', 'bitcoin');

      return this._httpClient.get(url, {params: params});
  }




}
