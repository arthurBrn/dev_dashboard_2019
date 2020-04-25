import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weatherforecast',
  templateUrl: './weatherforecast.component.html',
  styleUrls: ['./weatherforecast.component.css']
})
export class WeatherforecastComponent implements OnInit {

  city: string;
  country: string;

  constructor() { }

  ngOnInit(): void {
  }

  onNewWeatherForecastWidget() {

  }

}
