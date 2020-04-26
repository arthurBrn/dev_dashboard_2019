import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-configure-graph',
  templateUrl: './configure-graph.component.html',
  styleUrls: ['./configure-graph.component.css']
})
export class ConfigureGraphComponent implements OnInit {

  constructor() { }
  
  crypto
  start;
  end;

  @Output() startDateTime = new EventEmitter();
  @Output() endDateTime = new EventEmitter();

  

  ngOnInit(): void {
    this.end = new Date();
    let begin = new Date();
    begin.setMonth(begin.getMonth() - 1);
    this.start = begin;
  }

  onSubmit() {
      if (this.start && this.end) {
        this.startDateTime.emit(this.start);
        this.endDateTime.emit(this.end);
      }
      
  }

}
