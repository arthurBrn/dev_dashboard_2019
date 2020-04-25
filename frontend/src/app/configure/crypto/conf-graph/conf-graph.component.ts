import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conf-graph',
  templateUrl: './conf-graph.component.html',
  styleUrls: ['./conf-graph.component.css']
})
export class ConfGraphComponent implements OnInit {

  constructor() { }

  start;
  end;

  ngOnInit(): void {
  }

  onSubmit() {
      console.log(this.end);
      console.log(this.start);
  }

}
