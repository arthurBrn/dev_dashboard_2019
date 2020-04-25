import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-airqualityforecast',
  templateUrl: './airqualityforecast.component.html',
  styleUrls: ['./airqualityforecast.component.css']
})
export class AirqualityforecastComponent implements OnInit {

  city: string;
  country: string;

  constructor() { }

  ngOnInit(): void {
  }

  onNewAirQualityForecastWidget() {

  }

}
