import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { CryptoService } from '../../../service/crypto.service';

@Component({
  selector: 'app-history-chart',
  templateUrl: './history-chart.component.html',
  styleUrls: ['./history-chart.component.css']
})
export class HistoryChartComponent implements OnInit {

  constructor(private _cryptoServicce: CryptoService) { }

  title = 'USD Price of bitcoin last month';
   type = 'AreaChart';
   data = [];
   options = {   
      hAxis: {
        //  title: 'Last Month',
        //  textPosition: 'none'
      },
      vAxis:{
         // title: 'Price'
      },
      legend: 'none',
   };
   width = 1000;
   height = 400;
  
  ngOnInit(): void {
    this.data = [];
    this._cryptoServicce.getGraph().subscribe((data) => {
        let parsedData = data as any;
        parsedData.data.forEach(element => {
          this.data.push([formatDate(element.date, 'dd-MM', 'fr-FR').toString(), parseInt(element.priceUsd)])
        });
        console.log(this.data);
        this.data = this.data.slice();
    });
  }
}
