import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.css']
})
export class ServiceCardComponent implements OnInit {


  /*@Input() image;
  @Input() title;
  @Input() id;
  @Input() widgetsValue;*/
  @Input() cryptoWidget;
  @Input() weatherWidget;
  @Output() serviceSelectionned = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    // this.title = this.widgetsValue.name;


    console.log(' CRYPTO WIDget ');
    // this.cryptoWidget.forEach(element => console.log('element namen :' + element));

    console.log(this.cryptoWidget);
    console.log(this.cryptoWidget[0]);
    this.cryptoWidget.forEach(element => {
      console.log(element);
    });
    // console.log(this.cryptoWidget[1][0].elementName);
    // console.log(this.cryptoWidget[0].params);
    // console.log(this.cryptoWidget[0].elementName);
    //console.log(this.cryptoWidget[0].elementName);
    // console.log(this.cryptoWidget[0].params);
    /*console.log('WEATHE RWIDET');
    console.log(this.weatherWidget[0]);
    console.log(this.weatherWidget[0].elementName);
    console.log(this.weatherWidget[0].params);*/
  }

  onCardCLick(event) {
      var target = event.target || event.srcElement || event.currentTarget;
      this.serviceSelectionned.emit(target.id);
  }

}
