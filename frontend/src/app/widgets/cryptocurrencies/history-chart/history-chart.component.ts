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

   title;
   type = 'AreaChart';
   data = [];
   options = {   
      chartArea: {'width': '90%', 'height': '80%'},
      legend: 'none',
      hAxis: {
        textPosition: 'none'
      },
      vAxis:{
         // title: 'Price'
      },

   };
   width;
   height;

   
  ngOnInit(): void {
    this.title = `Price evolution of ${this.crypto}`;
    const start = new Date(this.startDateTime);
    const end = new Date(this.endDateTime);
    const startNb = start.getTime();
    const endNb = end.getTime()
    console.log(startNb, ' ' , endNb)
     this.displayGraph(endNb, startNb);
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
