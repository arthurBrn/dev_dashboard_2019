import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor(private _httpClient: HttpClient) { }

  baseUrl: String = 'http://127.0.0.1:8080/';

  getPublicServices() {
    return ('public services');
  }
}
