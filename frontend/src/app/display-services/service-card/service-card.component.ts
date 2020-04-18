import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.css']
})
export class ServiceCardComponent implements OnInit {


  @Input() image;
  @Input() title;
  @Input() id;

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  onCardCLick(event) {
      var target = event.target || event.srcElement || event.currentTarget;
      var idAttr = target.id
      console.log(idAttr)
      this._router.navigate(['widget']);
  }

}
