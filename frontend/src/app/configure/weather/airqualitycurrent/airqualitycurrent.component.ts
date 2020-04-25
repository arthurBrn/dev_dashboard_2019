import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-airqualitycurrent',
  templateUrl: './airqualitycurrent.component.html',
  styleUrls: ['./airqualitycurrent.component.css']
})
export class AirqualitycurrentComponent implements OnInit {

  city: string;
  country: string;

  constructor() { }

  ngOnInit(): void {
  }

  onValidateNewWidget() {
    console.log('validation');
  }

}
