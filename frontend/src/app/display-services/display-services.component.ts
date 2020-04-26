import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import {CryptoService} from "../service/crypto.service";
import {WeatherService} from "../service/weather.service";
import { Observable, throwError } from 'rxjs';
import {UserWidget} from "../Model/userWidget";

@Component({
  selector: 'app-display-services',
  templateUrl: './display-services.component.html',
  styleUrls: ['./display-services.component.css']
})
export class DisplayServicesComponent {


  services = [];
  serviceClicked;
  widgets = new Map([]);
  tokenValue: String;

  public allFromUserWidget = [];

  cryptoWidgets = [];
  weatherWidgets = [];
  elementsName = [];

  constructor(
    private _router: Router,
    private _location: Location,
    private _apiService: ApiService,
    private _cryptoService: CryptoService,
    private _weatherService: WeatherService,
  ) { }

  ngOnInit(): void {
    this.tokenValue = localStorage.getItem('accessToken');
    console.log('widgets : ' + this._location.getState()['ourWidgets']);

    this.loadUserWidgets(this.tokenValue);
    console.log(this.elementsName);
  }

  loadUserWidgets(userToken){
    if (localStorage.getItem('accessToken')) {
      this._apiService.getUserWidgetsKeys(userToken).subscribe((data) => {
        let parsed = data as any;
        parsed.forEach(element => {
          this.elementsName.push({
            name: element.name,
          });
          switch (element.label) {
            case 'crypto':
              this._cryptoService.getCryptoWidgets(this.tokenValue, element.name).subscribe((cryptoData) => {
                let parsedCrypto = cryptoData as any;
                // this.cryptoWidgets = [];
                parsedCrypto.forEach(cryptoElement => {
                  this.cryptoWidgets.push({
                    elementName: element.name,
                    params: cryptoElement,
                  });
                });
              });
              break;
            case 'weather':
              this._weatherService.getWeatherWidgets(this.tokenValue, element.name).subscribe((weatherData) => {
                let parsedWeather = weatherData as any;
                this.weatherWidgets = [];
                parsedWeather.forEach(weatherElement => {
                  this.weatherWidgets.push({
                    elementName: element.name,
                    params: weatherElement,
                    widgetId: weatherElement.id,
                  });
                });
                console.log('WW LENGHT');
                console.log(this.weatherWidgets.length);
              });
              break;
          }
        });
      });
    }
  }
}
