import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CryptoService } from '../../../service/crypto.service';

@Component({
  selector: 'app-conf-graph',
  templateUrl: './conf-graph.component.html',
  styleUrls: ['./conf-graph.component.css']
})
export class ConfGraphComponent implements OnInit {

  constructor(private _cryptoService: CryptoService) { }

  start;
  end;
  crypto;
  token: String;
  createdWiget = [];

  title = 'angular-material-autocomplete';
 
  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;

  ngOnInit(): void {
      this.token = localStorage.getItem('accessToken')
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
    this._cryptoService.getGraphList().subscribe(data =>{
        let graphList = data as any;
        graphList.forEach(element => {
            this.createdWiget.push({
                id: element.id,
                crypto: element.crypto,
                start: element.startGraph,
                end: element.endGrpah
            })
        });
        console.log(this.createdWiget)
    })
  }

  onSubmit() {
      if (this.options.includes(this.crypto)) {
        this._cryptoService.insertGraph({
            crypto: this.crypto,
            start: this.start,
            end: this.end
        }, this.token).subscribe(() => window.location.reload());
      } 
     }

   private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();    
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onDelete(event) {
    let target = event.target || event.srcElement || event.currentTarget;
    this._cryptoService.deleteGraph(target.id).subscribe(() => window.location.reload());
  }
}
