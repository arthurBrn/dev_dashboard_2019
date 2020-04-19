import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { formatDate } from '@angular/common';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { CryptoService } from '../../../service/crypto.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-history-chart',
  templateUrl: './history-chart.component.html',
  styleUrls: ['./history-chart.component.css']
})
export class HistoryChartComponent implements OnInit {

  constructor(private _cryptoServicce: CryptoService) { }

  @Input() crypto;
  @Input() startDateTime;
  @Input() endDateTime;

  title = 'Price evolution';
   type = 'AreaChart';
   data = [];
   options = {   
      chartArea: {'width': '90%', 'height': '70%'},
      legend: 'none',
   };
   width;
   height;

   
  ngOnInit(): void {
    let end = new Date().getTime();
    let start = new Date();
    start.setMonth(start.getMonth() - 1);
    let startDate = start.getTime();
    this.displayGraph(end, startDate);
  }

  ngOnChanges(changes: SimpleChange) {
    for (let propName in changes) {
      let change = changes[propName];
      if (propName == 'crypto') {
        let end = new Date().getTime();
        let start = new Date();
        start.setMonth(start.getMonth() - 1);
        let startDate = start.getTime();
        this.displayGraph(end, startDate);
      }
      if (propName == 'startDateTime') {
        if(this.startDateTime) {
            this.displayGraph(this.endDateTime.getTime(), this.startDateTime.getTime());
        }
      }
      if (propName == 'endDateTime') {
        if (this.endDateTime) {
            this.displayGraph(this.endDateTime.getTime(), this.startDateTime.getTime());
        }
      }
    }
    

  }

  displayGraph(endDateTime, startDateTime) {
    this.width = $('#graphContainer').width();
    this.height = $('#graphContainer').height();
    this.data = [];
    
    let values = {
        start: startDateTime,
        end: endDateTime,
        crypto: this.crypto,
    }
    this._cryptoServicce.getGraph(values).subscribe((data) => {
        let parsedData = data as any;
        parsedData.data.forEach(element => {
          this.data.push([formatDate(element.date, 'dd-MM-yy', 'fr-FR').toString(), parseInt(element.priceUsd)])
        });
        this.data = this.data.slice();
    });
  }
}
