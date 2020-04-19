import { Component, OnInit, ElementRef } from '@angular/core';




@Component({
  selector: 'app-cryptocurrencies',
  templateUrl: './cryptocurrencies.component.html',
  styleUrls: ['./cryptocurrencies.component.css']
})
export class CryptocurrenciesComponent implements OnInit {

    constructor(private el:ElementRef) {
        
    }

    ngOnInit() {
      $(window).resize(function(){location.reload();});
    }
}
