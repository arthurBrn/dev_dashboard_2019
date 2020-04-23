
import { Component, OnInit, TemplateRef  } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { WeatherService } from '../../service/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  modalRef: BsModalRef;
  widgetName: string;
  widgetDescription: string;
  widgetTimer: number;
  weatherServiceId: number = 2;
  paramsId: number;

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

  widgetWeather = [];


  constructor(
    private _toastr: ToastrService,
    private _modalService: BsModalService,
    private _weatherApiService: WeatherService,
  ) { }

  ngOnInit(): void {
    this._weatherApiService.getAllWeatherWidget().subscribe((data) => {
      var parsedData = data as any;
      console.log(parsedData[0]);
      let i = 0;
      while (i != parsedData.length) {
        this.widgetWeather.push({
          name: parsedData[i].name,
          description: parsedData[i].description,
          timer: parsedData[i].timer,
          serviceId: parsedData[i].service_id,
          paramsId: parsedData[i].weather_widget_params_id
        });
        i++;
      }
    });
  }



  onNewWidgetClick(template: TemplateRef<any>) {
    this.modalRef = this._modalService.show(template);
  }

  onValidateNewWidget() {
    if (this.widgetName && this.optionChosen && this.widgetDescription) {
      console.log(this.widgetName);
      console.log(this.optionChosen + ' = ' + this.widgetPossiblity[this.optionChosen]['name']);
      console.log(this.widgetDescription);

      this._weatherApiService.addNewWeatherWidget({
        name: this.widgetName,
        description: this.widgetDescription,
        timer: this.widgetTimer,
        serviceId: this.weatherServiceId,
        paramsId: this.paramsId,
      }).subscribe((data) => {
        let parsedData = data as any;
        if (parsedData.code === 200) {
          console.log('Insertion done');
        } else {
          this._toastr.warning('OLA CA A FAIL');
        }
      });
      this._modalService.hide(1);
    } else {
      this._toastr.warning('All fields must be filled.');
    }
  }

}
