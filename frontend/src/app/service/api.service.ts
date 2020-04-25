import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import {isDeclaration} from "@angular/compiler-cli/src/ngtsc/util/src/typescript";

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

  logout(token) {
    const body = new HttpParams()
      .set('token', token);
    return this._httpClient.delete(this.baseUrl + '/logout');
  }

  getUserWidgetsKeys(userToken) {
    return this._httpClient.get(this.baseUrl + 'widgets',
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('Authorization', 'Bearer ' + userToken)
      });
  }


  getWWidgetList() {
    return this._httpClient.get(this.baseUrl + 'widgetList');
  }

  insertToken(datas) {
      console.log(datas)
      const body = new HttpParams()
      .set('provider', datas.provider)
      .set('token', datas.token)
      .set('idUser', datas.idUser)
    return this._httpClient.post(this.baseUrl + 'insertToken',
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      });
  }

  updateToken(datas) {
      console.log(datas)
      const body = new HttpParams()
      .set('provider', datas.provider)
      .set('token', datas.token)
      .set('idUser', datas.idUser)
    return this._httpClient.post(this.baseUrl + 'updateToken',
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      });
  }

  setUserWidget(accessToken, widgetId) {
    const body = new HttpParams()
      .set('widgetId', widgetId);
    return this._httpClient.post(this.baseUrl + 'add/widgets',
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('Authorization', 'Bearer ' + accessToken)
      });
  }

  getWidgetIdFromName(widgetName) {
    const body = new HttpParams()
      .set('widgetName', widgetName)
    return this._httpClient.post(this.baseUrl + 'widget/from/name',
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      });
  }
}
