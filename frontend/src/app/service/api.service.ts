import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  // baseUrl: String = 'http://localhost:8081/';
  baseUrl: String = 'http://127.0.0.1:8081/';

  login(mail, password) {
    const body = new HttpParams()
      .set('mail', mail)
      .set('password', password);
    return this._httpClient.post(this.baseUrl + 'user/login/jwt',
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      });
  }

  /*register(user) {
    const body = new HttpParams()
      .set('first_name', user.first_name)
      .set('last_name', user.last_name)
      .set('email', user.email)
      .set('password', user.password)
      .set('createdAt', user.createdAt)
    return this._httpClient.post(this.baseUrl + 'connect/register',
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      });
  }*/
}

