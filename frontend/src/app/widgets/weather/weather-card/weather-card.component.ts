import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit {

  @Input() widgetName;
  @Input() widgetDescription;

  isAuth = localStorage.getItem('accessToken') ? true : false;

  constructor(
    private _router: Router,
  ) { }

  ngOnInit(): void {
  }

  onCardClicked() {
    this._router.navigateByUrl('weather/detail', { state: {id:5}} );
  }

}
