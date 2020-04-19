import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit {

  @Input() id;
  @Input() widgetName;
  @Input() widgetDescription;
  @Input() timePeriod;

  isAuth = localStorage.getItem('accessToken') ? true : false;

  constructor() { }

  ngOnInit(): void {
  }



}
