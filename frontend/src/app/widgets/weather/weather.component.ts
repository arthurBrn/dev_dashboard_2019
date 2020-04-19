
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
  widgetCityName: string;
  widgetTimePeriod: string;
  weatherObject = [
    {
      id: '1', title: "name", description : "some description", timePeriod: "time period"
    },
    {
      id: '2', title: "name", description : "some description", timePeriod: "time period",
    },
    {
      id: '3', title: "name", description : "some description", timePeriod: "time period",
    }
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
    if (this.widgetName && this.widgetCityName && this.widgetTimePeriod) {
      // Validation process of the data entered.
      this._modalService.hide(1);
      // Add the new widget name to the sidebar
      // Make the request, create new servcie like weather service
    } else {
      this._toastr.warning('All fields must be filled.');
    }
  }

}
