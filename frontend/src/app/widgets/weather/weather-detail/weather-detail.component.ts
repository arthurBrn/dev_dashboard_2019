import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-weather-detail',
  templateUrl: './weather-detail.component.html',
  styleUrls: ['./weather-detail.component.css']
})
export class WeatherDetailComponent implements OnInit {

  id: number;
  name: string = "some random name";
  description: string = "some random description";

  constructor(
    private _location: Location,
  ) { }

  ngOnInit(): void {
    this.id = this._location.getState()['id'];
    // Then request through API to get all information about widget
  }
}
