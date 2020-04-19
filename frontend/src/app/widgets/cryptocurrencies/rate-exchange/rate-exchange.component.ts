import { Component, OnInit, Input } from '@angular/core';
import { CryptoService } from '../../../service/crypto.service';

@Component({
  selector: 'app-rate-exchange',
  templateUrl: './rate-exchange.component.html',
  styleUrls: ['./rate-exchange.component.css']
})
export class RateExchangeComponent implements OnInit {

  constructor(private _cryptoService: CryptoService) { }

  rate;
  symbol;
  displayRate;
  @Input() crypto;
  dollarValue: number;
  cryptoValue: number;


  ngOnChanges(changes: any) {
      this.getPrice();
  }

  ngOnInit(): void {
    this.getPrice();
  }

  getPrice() {
      this.rate = '';
      this._cryptoService.rate().subscribe((data) => {
        let parsedData = data as any;
        parsedData.data.forEach(element => {
            if (this.crypto === element.baseId) {
                this.rate = parseFloat(element.priceUsd);
                this.symbol = element.baseSymbol;
                this.displayRate = `1 ${this.symbol} = ${this.rate} USD`;
            };
        });
        if (!this.rate) {
            this.displayRate = 'No datas provided';
        }
    });
  }

  onChangeDollarValue(value) {
      this.cryptoValue = value / this.rate;
  }

  onChangeCryptoValue(value) {
      this.dollarValue = value * this.rate;
  }

}
