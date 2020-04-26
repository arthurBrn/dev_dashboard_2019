import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private _httpClient: HttpClient,
  ) { }

  _baseUrl: string = "http://127.0.0.1:8082/weather/";
  _baseUrlApi: string = "http://127.0.0.1:8082/weather/api/";
  _apiKey: string = "bf7db86c6d914d98a96c39416c8c595d";

  addNewWeatherWidget(data) {
    const body = new HttpParams()
      .set('name', data.name)
      .set('description', data.description)
      .set('timer', data.timer)
      .set('serviceId', data.serviceId)
      .set('paramsId', data.paramsId)
    return this._httpClient.post(this._baseUrl + 'add', body.toString(),
      { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')});
  }

  getWeatherWidgets(userToken, tableName) {
    const body = new HttpParams()
      .set('tableName', tableName);
    return this._httpClient.post(this._baseUrl + 'widgets', body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('Authorization', 'Bearer ' + userToken)
      });
  }

  addWeatherWidget(userToken, tableName, city, country) {
    const body = new HttpParams()
      .set('tableName', tableName)
      .set('city', city)
      .set('country', country)
      .set('apiKey', this._apiKey);
    return this._httpClient.post(this._baseUrl + 'add/widgets', body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('Authorization', 'Bearer ' + userToken)
      });
  }

  alterWeatherWidget(userToken, tableName, city, country, widgetId) {
    const body = new HttpParams()
      .set('tableName', tableName)
      .set('city', city)
      .set('country', country)
      .set('apiKey', this._apiKey)
      .set('widgetId', widgetId);
    return this._httpClient.put(this._baseUrl + 'alter/widgets', body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('Authorization', 'Bearer ' + userToken)
      });
  }

  deleteWeatherWidget(userToken, tableName, widgetId) {
    const body = new HttpParams()
      .set('tableName', tableName)
      .set('widgetId', widgetId);
    return this._httpClient.post(this._baseUrl + 'delete/widgets', body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('Authorization', 'Bearer ' + userToken)
      });
  }

  callAirQuality(city, country, type) {
    const url = this._baseUrlApi + `airquality/${type}`;
    let params = new HttpParams();
    params = params.append('city', city);
    params = params.append('country', country);
    params = params.append('apiKey', this._apiKey);
    return this._httpClient.get(url, {params: params});
  }

  callZeroToSixteenDaysForecast(city, country) {
    const url = this._baseUrlApi + 'forecast/zeroToSixteenDays';
    let parameters = new HttpParams();
    parameters = parameters.append('city', city);
    parameters = parameters.append('country', country);
    parameters = parameters.append('apiKey', this._apiKey);
    return this._httpClient.get(url, {params: parameters});
  }
}
