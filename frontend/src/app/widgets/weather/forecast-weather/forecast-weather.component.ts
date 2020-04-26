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
  editedCityName:string;
  editedCountryName:string;
  windSpeed: number;
  temperature: number;
  ressenti: number;
  weather: string;

  constructor(
    private _toastr: ToastrService,
    private _modalService: BsModalService,
    private _weatherService: WeatherService,
  ) { }

  ngOnInit(): void {
  }

  getForecastWeather(){
    this._weatherService.callZeroToSixteenDaysForecast(this.city, this.country).subscribe((data) => {
      let parsed = data as any;
      console.log(parsed);
      /*console.log(parsed.city_name);
      console.log(parsed.data[0].aqi);
      console.log(parsed.data[0].co);*/
      //this.airQuality = parsed.data[0].aqi;
      //this.carbonMonoxyde = parsed.data[0].co;
      this.city = parsed.city_name;
    })
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
