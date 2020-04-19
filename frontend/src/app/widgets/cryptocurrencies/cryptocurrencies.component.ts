import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cryptocurrencies',
  templateUrl: './cryptocurrencies.component.html',
  styleUrls: ['./cryptocurrencies.component.css']
})
export class CryptocurrenciesComponent implements OnInit {

    crypto = 'bitcoin';

    constructor() {
        
    }

    ngOnInit() {
      $(window).resize(function(){location.reload();});
    }

    onChangeCrypto(event) {
      this.crypto = event;
    }
}
