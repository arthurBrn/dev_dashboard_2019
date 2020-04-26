import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-regular-weather',
  templateUrl: './regular-weather.component.html',
  styleUrls: ['./regular-weather.component.css']
})
export class RegularWeatherComponent implements OnInit {

  @Input() city;
  @Input() country;

  constructor() { }

  ngOnInit(): void {
    console.log('CITY FROM REGULAR : ' + this.city);
    console.log('Country from regular : ' + this.country);
  }

}
