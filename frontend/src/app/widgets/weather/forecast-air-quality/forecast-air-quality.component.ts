import {Component, OnInit, Input, TemplateRef} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {WeatherService} from "../../../service/weather.service";

@Component({
  selector: 'app-forecast-air-quality',
  templateUrl: './forecast-air-quality.component.html',
  styleUrls: ['./forecast-air-quality.component.css']
})
export class ForecastAirQualityComponent implements OnInit {

  modalRef: BsModalRef;
  @Input() city;
  @Input() country;
  airQuality: number;
  carbonMonoxyde: number;
  editedCityName:string;
  editedCountryName:string;

  constructor(
    private _toastr: ToastrService,
    private _modalService: BsModalService,
    private _weatherService: WeatherService,
  ) { }

  ngOnInit(): void {
    this.getForecastAirQuality();
  }

  getForecastAirQuality(){
    this._weatherService.callAirQuality(this.city, this.country, 'forecast').subscribe((data) => {
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
      this._modalService.hide(1);
    } else {
      this._toastr.warning('Fields must be filled.');
    }
  }

  onRemoveWidget(){

  }

}
