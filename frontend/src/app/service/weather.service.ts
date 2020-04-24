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

  getAllWeatherWidget() {
    return this._httpClient.get(this._baseUrl);
  }

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
}
