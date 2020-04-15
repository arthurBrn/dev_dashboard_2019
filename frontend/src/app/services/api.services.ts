import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiServices {
  constructor(
    private _httpClient: HttpClient,
  ) { }

  serverUrl: String = 'http://localhost:8080/';

  login(user) {
    const body = new HttpParams()
      .set('email', user.email)
      .set('password', user.password);
    return this._httpClient.post(this.serverUrl + 'connect/login',
      body.toString(), {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      });
  }
}

