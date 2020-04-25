import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weathercurrent',
  templateUrl: './weathercurrent.component.html',
  styleUrls: ['./weathercurrent.component.css']
})
export class WeathercurrentComponent implements OnInit {

  city: string;
  country: string;

  constructor() { }

  ngOnInit(): void {
  }

  onNewWeatherCurrentWidget() {

  }

}
