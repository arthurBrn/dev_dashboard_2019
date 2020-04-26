import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {WeatherService} from "../../../service/weather.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-current-air-quality',
  templateUrl: './current-air-quality.component.html',
  styleUrls: ['./current-air-quality.component.css']
})
export class CurrentAirQualityComponent implements OnInit {

  modalRef: BsModalRef;
  @Input() city;
  @Input() country;
  @Input() widgetId;
  airQuality: number;
  carbonMonoxyde: number;
  editedCityName:string;
  editedCountryName:string;
  tokenValue: string;

  constructor(
    private _toastr: ToastrService,
    private _modalService: BsModalService,
    private _weatherService: WeatherService,
  ) { }

  ngOnInit(): void {
    this.tokenValue = localStorage.getItem('accessToken');
    this.getCurrentAirQuality();
  }

  getCurrentAirQuality(){
    this._weatherService.callAirQuality(this.city, this.country, 'current').subscribe((data) => {
      let parsed = data as any;
      this.airQuality = parsed.data[0].aqi;
      this.carbonMonoxyde = parsed.data[0].co;
      this.city = parsed.city_name;
    });
  }

  onEditWidget(template: TemplateRef<any>) {
    this.modalRef = this._modalService.show(template);
  }

  onValidateWidgetEdition() {
    if (this.editedCountryName && this.editedCityName) {
      console.log(this.widgetId);
      this._weatherService.alterWeatherWidget(
        this.tokenValue,
        'airqualitycurrent',
        this.editedCityName,
        this.editedCountryName,
        this.widgetId
      )
        .subscribe((data) => {
          let parsedData = data as any;
          if (parsedData.code === 200) {
            this._toastr.success(parsedData.success);
            window.location.reload();
          } else {
            this._toastr.warning('Something went wrong');
          }
        })
      this._modalService.hide(1);
    } else {
      this._toastr.warning('Fields must be filled.');
    }
  }

  onRemoveWidget(){

  }
}
