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
  userWidgets = [];

  constructor(
    private _router: Router,
    private _apiService: ApiService,
    private _cryptoService: CryptoService,
    private _weatherService: WeatherService,
  ) {}

  ngOnInit() {
    this.tokenValue = localStorage.getItem('accessToken');

    this.loadUserWidgets(this.tokenValue);
  }

  loadUserWidgets(userToken){
    this._apiService.getUserWidgetsKeys(userToken).subscribe((data) => {
      let parsed = data as any;
      parsed.forEach(element => {
        switch (element.label) {
          case 'crypto':
            this._cryptoService.cryptoWidgets(this.tokenValue, element.name).subscribe((data) => {
              let parsedCrypto = data as any;
              parsedCrypto.forEach(cryptoElement => {
                console.log(cryptoElement);
              });
            });
            break;
          case 'weather':

            break;
        }
        this.userWidgets.push({
          name: element.name,
          label: element.label,
        });
        console.log(element);
      });
      console.log('usr widget inside : ' + this.userWidgets);
    });
  }

  onLogOut(event) {
    this.isAuth = event;
  }
}




