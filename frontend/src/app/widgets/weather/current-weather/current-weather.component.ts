import { Component, OnInit, Input } from '@angular/core';
import {WeatherService} from "../../../service/weather.service";

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {

  @Input() city;
  @Input() hours;

  constructor(
    private _weatherService: WeatherService,
  ) { }

  ngOnInit(): void {
    console.log('CITY : ' + this.city);
    console.log('HOURS : ' + this.hours);
  }

}
