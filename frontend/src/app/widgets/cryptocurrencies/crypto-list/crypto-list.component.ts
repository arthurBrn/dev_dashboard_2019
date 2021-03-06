import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CryptoService } from '../../../service/crypto.service';

@Component({
  selector: 'app-crypto-list',
  templateUrl: './crypto-list.component.html',
  styleUrls: ['./crypto-list.component.css']
})



export class CryptoListComponent implements OnInit {

  constructor(private _cryptoService: CryptoService) { }

  cryptoList = [];
  selectedCrypto;
  default;
  @Output() cryptoSelected = new EventEmitter();

  ngOnInit(): void {
      this._cryptoService.getList().subscribe((data) => {
          let parsedData = data as any;
          parsedData.data.forEach(element => {
          this.cryptoList.push({
              id: element.id,
              name: element.name,
              symbol: element.symbol,
          })
        });
      });
  }
  onCryptoCLick(event) {
      var target = event.target || event.srcElement || event.currentTarget;
      $('li').removeClass('active');
      $('#' + target.id).addClass('active');
      this.cryptoSelected.emit(target.id);
  }

}
