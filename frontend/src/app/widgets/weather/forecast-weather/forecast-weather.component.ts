import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {WeatherService} from "../../../service/weather.service";

@Component({
  selector: 'app-forecast-weather',
  templateUrl: './forecast-weather.component.html',
  styleUrls: ['./forecast-weather.component.css']
})
export class ForecastWeatherComponent implements OnInit {

  modalRef: BsModalRef;
  @Input() city;
  @Input() country;
  @Input() widgetId;
  editedCityName:string;
  editedCountryName:string;
  clouds: number;
  temperature: number;
  weather: string;
  tokenValue: string;

  constructor(
    private _toastr: ToastrService,
    private _modalService: BsModalService,
    private _weatherService: WeatherService,
  ) { }

  ngOnInit(): void {
    this.tokenValue = localStorage.getItem('accessToken');
    this.getForecastWeather();
  }

  getForecastWeather(){
    this._weatherService.callZeroToSixteenDaysForecast(this.city, this.country).subscribe((data) => {
      let parsed = data as any;
      this.clouds = parsed.data[0].clouds;
      this.temperature = parsed.data[0].temp;
      this.weather = parsed.data[0].weather.description;
      this.city = parsed.city_name;
    })
  }

  onEditWidget(template: TemplateRef<any>) {
    this.modalRef = this._modalService.show(template);
  }

  onValidateWidgetEdition() {
    if (this.editedCountryName && this.editedCityName) {
      console.log(this.widgetId);
      this._weatherService.alterWeatherWidget(
        this.tokenValue,
        'weatherforecast',
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
    this._weatherService.deleteWeatherWidget(this.tokenValue, 'weatherforecast', this.widgetId).subscribe((data) => {
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
