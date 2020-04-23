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
}
