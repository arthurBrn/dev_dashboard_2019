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

  constructor(
    private _toastr: ToastrService,
    private _modalService: BsModalService,
  ) { }

  ngOnInit(): void {
  }

  onNewWidgetClick(template: TemplateRef<any>) {
    let plusIcon = document.getElementById('weather-plus-icon');
    plusIcon.classList.add('fa-spin');
    console.log(plusIcon);
    this.modalRef = this._modalService.show(template);
  }

  onValidateNewWidget() {
    if (this.widgetName && this.widgetCityName && this.widgetTimePeriod) {
      this._modalService.hide(1);
      console.log(this.widgetName);
      console.log(this.widgetCityName);
      console.log(this.widgetTimePeriod);
    } else {
      this._toastr.warning('All fields must be filled.');
    }
  }

}
