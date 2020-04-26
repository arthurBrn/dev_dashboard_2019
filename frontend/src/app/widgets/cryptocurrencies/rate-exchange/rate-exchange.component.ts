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
      this._cryptoService.getCryptoRate(this.crypto).subscribe((data) => {
          let datas = data as any;
          this.rate = datas.data.priceUsd;
      });
  }

  onChangeDollarValue(value) {
      this.cryptoValue = value / this.rate;
  }

  onChangeCryptoValue(value) {
      this.dollarValue = value * this.rate;
  }

}
