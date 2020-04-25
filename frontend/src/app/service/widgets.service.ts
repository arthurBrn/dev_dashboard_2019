import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class WidgetsService {

  private _baseUrl: string ="";


  constructor(
    private _httpClient: HttpClient,
    private _apiService: ApiService,
  ) { }

  getWidgets() {

  }

}
