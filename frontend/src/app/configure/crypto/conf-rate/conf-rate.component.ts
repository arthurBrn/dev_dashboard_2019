import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conf-rate',
  templateUrl: './conf-rate.component.html',
  styleUrls: ['./conf-rate.component.css']
})
export class ConfRateComponent implements OnInit {

  constructor() { }

  cryptoName;

  ngOnInit(): void {
  }

  onSubmit() {
      console.log('submit');
  }

}
