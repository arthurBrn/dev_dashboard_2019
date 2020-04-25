import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import {CryptoService} from "../service/crypto.service";
import {WeatherService} from "../service/weather.service";

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

    this.loadStartWidgets()
    //this.loadUserWidgets(this.tokenValue);
  }

  onServiceSelectionned(event) {
      const widget = this.widgets.get(event);
      if(widget != 'comming soon') {
          this._router.navigate([ widget ]);
      } else {
          console.log('not implemented yet');
      }
  }

  loadStartWidgets(){
    if (this.tokenValue) {
      this._apiService.getUserWidgetsKeys(this.tokenValue).subscribe((data) => {
        let parsed = data as any;
        parsed.forEach(element => {
          console.log(element.name);
          this.elementsName.push({
            name: element.name,
          });
        });
      });
    }
  }

  loadUserWidgets(userToken){
    if (localStorage.getItem('accessToken')) {
      this._apiService.getUserWidgetsKeys(userToken).subscribe((data) => {
        let parsed = data as any;
        parsed.forEach(element => {
          console.log(element.name);
          this.elementsName.push({
            name: element.name,
          });
          switch (element.label) {
            case 'crypto':
              this._cryptoService.getCryptoWidgets(this.tokenValue, element.name).subscribe((cryptoData) => {
                let parsedCrypto = cryptoData as any;
                parsedCrypto.forEach(cryptoElement => {
                  this.cryptoWidgets.push({

                  });
                  console.log(cryptoElement);
                });
              });
              break;
            case 'weather':
              this._weatherService.getWeatherWidgets(this.tokenValue, element.name).subscribe((weatherData) => {
                let parsedWeather = weatherData as any;
                parsedWeather.forEach(weatherElement => {
                  /*this.weatherWidgets.push({
                    weatherElement
                  });*/
                  console.log(weatherElement);
                });
              });
              break;
          }
        });
      });
    }
  }
}
