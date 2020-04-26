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
    tokenValue: String;
    this.tokenValue = localStorage.getItem('accessToken');

    this.loadUserWidgets(this.tokenValue);
  }

  loadUserWidgets(userToken){
    if (localStorage.getItem('accessToken')) {
      this._apiService.getUserWidgetsKeys(userToken).subscribe((data) => {
      let parsed = data as any;
      parsed.forEach(element => {
        switch (element.label) {
          case 'crypto':
            this._cryptoService.getCryptoWidgets(this.tokenValue, element.name).subscribe((cryptoData) => {
              let parsedCrypto = cryptoData as any;
              parsedCrypto.forEach(cryptoElement => {
                // console.log(cryptoElement);
              });
            });
            break;
          case 'weather':
            this._weatherService.getWeatherWidgets(this.tokenValue, element.name).subscribe((weatherData) => {
              let parsedWeather = weatherData as any;
              parsedWeather.forEach(weatherElement => {
                // console.log(weatherElement);
              });
            })
            break;
        }
      });
      });
    }
  }

  onLogOut(event) {
    this.isAuth = event;
  }
}




