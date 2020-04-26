import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.css']
})
export class ServiceCardComponent implements OnInit {

  @Input() cryptoWidget;
  @Input() weatherWidget;
  @Output() serviceSelectionned = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onCardCLick(event) {
      var target = event.target || event.srcElement || event.currentTarget;
      this.serviceSelectionned.emit(target.id);
      
  }

}
