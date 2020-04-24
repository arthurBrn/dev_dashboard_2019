import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WidgetsService {

  _baseUrl:

  constructor(
    private _httpClient: HttpClient
  ) { }

  getWidgets(user) {
    return this._httpClient.post(this.)
  }
}
