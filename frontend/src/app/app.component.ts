import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './service/api.service';
import { CryptoService } from './service/crypto.service';
import { WeatherService } from './service/weather.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  tokenValue: String;
  isAuth = localStorage.getItem('accessToken') ? true : false;


  constructor(
    private _router: Router,
    private _apiService: ApiService,
    private _cryptoService: CryptoService,
    private _weatherService: WeatherService,
  ) {}

  ngOnInit() {
    this.tokenValue = localStorage.getItem('accessToken');
  }

  onLogOut(event) {
    this.isAuth = event;
  }
}




