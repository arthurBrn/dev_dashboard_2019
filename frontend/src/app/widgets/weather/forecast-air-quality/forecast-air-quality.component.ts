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
      console.log(this.widgetId);
      this._weatherService.alterWeatherWidget(
        this.tokenValue,
        'airqualityforecast',
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
    this._weatherService.deleteWeatherWidget(this.tokenValue, 'airqualityforecast', this.widgetId).subscribe((data) => {
      let parsed = data as any;
      if (parsed.code === 200) {
        this._toastr.success('Widget deleted');
        window.location.reload();
      } else {
        this._toastr.warning('Error in the process');
      }
    });
  }

}
