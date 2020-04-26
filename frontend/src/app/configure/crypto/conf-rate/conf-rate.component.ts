import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CryptoService } from '../../../service/crypto.service';

@Component({
  selector: 'app-conf-rate',
  templateUrl: './conf-rate.component.html',
  styleUrls: ['./conf-rate.component.css']
})
export class ConfRateComponent implements OnInit {

  constructor(private _cryptoService: CryptoService) { }

  cryptoName;
  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  cryptoList = [];

  ngOnInit(): void {
      this._cryptoService.getList().subscribe((data) => {
          let datas = data as any;
          datas.data.forEach(element => {
              this.options.push(element.id);
          });
      })
      this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

      this._cryptoService.getDbRateList().subscribe(data =>{
        let rateList = data as any;
        rateList.forEach(element => {
            this.cryptoList.push({
                id: element.id,
                crypto: element.crypto
            })
        });
    })
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
 
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onSubmit() {
    if (this.options.includes(this.myControl.value)) {
      this._cryptoService.insertRate(this.myControl.value).subscribe(() => window.location.reload());
    }
  }

  onDelete(event) {
      let target = event.target || event.srcElement || event.currentTarget;
      this._cryptoService.deleteRate(target.id).subscribe(() => window.location.reload())
  }
}
