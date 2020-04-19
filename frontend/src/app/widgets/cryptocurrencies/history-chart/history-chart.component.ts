import { Component, OnInit, Input } from '@angular/core';
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

  title = 'USD Price for last month';
   type = 'AreaChart';
   data = [];
   options = {   
      chartArea: {'width': '90%', 'height': '70%'},
      legend: 'none',
   };
   width;
   height;

   
  ngOnInit(): void {
    this.displayGraph();
  }

  ngOnChanges(changes: any) {
    
    this.displayGraph();

  }

  displayGraph() {
    this.width = $('#graphContainer').width();
    this.height = $('#graphContainer').height();
    this.data = [];
    let end = new Date().getTime();
    let start = new Date();
    start.setMonth(start.getMonth() - 1);
    let startDate = start.getTime();
    let values = {
        start: startDate,
        end: end,
        crypto: this.crypto,
    }
    this._cryptoServicce.getGraph(values).subscribe((data) => {
        let parsedData = data as any;
        parsedData.data.forEach(element => {
          this.data.push([formatDate(element.date, 'dd-MM', 'fr-FR').toString(), parseInt(element.priceUsd)])
        });
        this.data = this.data.slice();
    });
  }
}
