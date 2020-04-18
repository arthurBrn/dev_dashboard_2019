import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.css']
})
export class ServiceCardComponent implements OnInit {


  @Input() image;
  @Input() title;

  constructor() { }

  ngOnInit(): void {
  }

  onCardCLick(event) {
  }

}
