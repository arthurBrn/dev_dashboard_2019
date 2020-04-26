import { Component, OnInit, Input } from '@angular/core';
import { WeatherService } from '../../../service/weather.service';

@Component({
  selector: 'app-regular-weather',
  templateUrl: './regular-weather.component.html',
  styleUrls: ['./regular-weather.component.css']
})
export class RegularWeatherComponent implements OnInit {

  @Input() city;
  @Input() country;
  @Input() elementName;

  airQuality: number;
  carbonMonoxyde: number;

  constructor(
    private _weatherService: WeatherService
  ) { }

  ngOnInit(): void {
    console.log('CITY FROM REGULAR : ' + this.city);
    console.log('Country from regular : ' + this.country);
    console.log('ELEMENT NAME : ' + this.elementName);
    this.callNecessaryRequest();
  }

  callNecessaryRequest() {
    switch (this.elementName) {
      case 'airqualitycurrent': {
        this._weatherService.callAirQuality(this.city, this.country, 'current').subscribe((data) => {
          let parsed = data as any;
          console.log(parsed);
          console.log(parsed.city_name);
          console.log(parsed.data[0].aqi);
          console.log(parsed.data[0].co);
          this.airQuality = parsed.data[0].aqi;
          this.carbonMonoxyde = parsed.data[0].co;
          this.city = parsed.city_name;
        });
      }
      case 'airqualityforecast': {
        this._weatherService.callAirQuality(this.city, this.country, 'forecast').subscribe((data) => {
          let parsed = data as any;
          this.airQuality = parsed.data[0].aqi;
          this.carbonMonoxyde = parsed.data[0].co;
        });
      }
      case 'weatherforecast': {
        this._weatherService.callZeroToSixteenDaysForecast(this.city, this.country).subscribe((data) => {
          let parsed = data as any;

        });
      }
    }
  }

  onEditWidget(){

  }

  onDeleteWidget(){

  }

}
