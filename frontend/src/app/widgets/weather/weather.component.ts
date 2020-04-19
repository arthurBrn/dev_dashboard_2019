
import { Component, OnInit, TemplateRef  } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  modalRef: BsModalRef;
  widgetName: string;
  widgetDescription: string;
  optionChosen:string;
  // Correspond to the user already existing weather widget
  weatherObject = [
    { id: '1', title: "name", description : "some description" },
    { id: '2', title: "name", description : "some description" },
    { id: '3', title: "name", description : "some description" }
  ];
  widgetPossiblity = [
    { id: '0', name: 'current weather' },
    { id: '1', name: '0 to 16 days forecast' },
    { id: '2', name: 'current air quality' },
    { id: '3', name: 'air quality forecast' },
  ];


  constructor(
    private _toastr: ToastrService,
    private _modalService: BsModalService,
  ) { }

  ngOnInit(): void {
    console.log(localStorage.getItem('accessToken'));

  }

  onNewWidgetClick(template: TemplateRef<any>) {
    this.modalRef = this._modalService.show(template);
  }

  onValidateNewWidget() {
    if (this.widgetName && this.optionChosen && this.widgetDescription) {
      console.log(this.widgetName);
      console.log(this.optionChosen + ' = ' + this.widgetPossiblity[this.optionChosen]['name']);
      console.log(this.widgetDescription);
      // Validation process of the data entered.
      //
      // close the modal
      this._modalService.hide(1);
    } else {
      this._toastr.warning('All fields must be filled.');
    }
  }

}
