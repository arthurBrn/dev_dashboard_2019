import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  baseUrl: String = 'http://127.0.0.1:8081/user/';

  login(mail, password) {
    const body = new HttpParams()
      .set('mail', mail)
      .set('password', password);
    return this._httpClient.post(this.baseUrl + 'login',
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      });
  }

  register(user) {
    const body = new HttpParams()
      .set('firstName', user.firstName)
      .set('lastName', user.lastName)
      .set('mail', user.mail)
      .set('password', user.password)
    return this._httpClient.post(this.baseUrl + 'register',
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      });
  }

  getMail(mail) {
    const body = new HttpParams()
      .set('mail', mail);
    return this._httpClient.post(this.baseUrl + 'mail',
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      });
  }

  logout(token) {
    const body = new HttpParams()
      .set('token', token);
    return this._httpClient.delete(this.baseUrl + '/logout');
  }
}

