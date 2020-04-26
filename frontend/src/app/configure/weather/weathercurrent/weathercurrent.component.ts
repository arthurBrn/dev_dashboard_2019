import { Component, OnInit } from '@angular/core';
import {WeatherService} from "../../../service/weather.service";
import {ApiService} from "../../../service/api.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-weathercurrent',
  templateUrl: './weathercurrent.component.html',
  styleUrls: ['./weathercurrent.component.css']
})
export class WeathercurrentComponent implements OnInit {

  city: string;
  hour: number;
  accessToken : string;
  tableName: string = "weathercurrent";

  constructor(
    private _weatherService: WeatherService,
    private _userService: ApiService,
    private _toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  onNewWeatherCurrentWidget() {
    if (this.city && this.hour) {
      this._userService.getWidgetIdFromName(this.tableName).subscribe((data) => {
        let parsed = data as any;
        if (parsed.code === 200) {
          this._userService.setUserWidget(this.accessToken, parsed.widgetId).subscribe((dataFromSet) => {
            let dataFromSetWidget = dataFromSet as any;
            if (dataFromSetWidget === 200) {
              console.log('User and widget id added to user_widget');
            } else {
              this._toastr.warning('Error in the process.');
            }
          });
          this._weatherService.addWeatherWidget(this.accessToken, this.tableName, this.city, this.hour).subscribe((dataWeatherWidget) => {
            let parsedData = dataWeatherWidget as any;
            if (parsedData.code === 200) {
              console.log('New widget added in weatherdb');
            } else {
              this._toastr.warning('Error while creating widget.');
            }
          });
        } else {
          this._toastr.warning(parsed.success);
        }
      });
    }
  }

}
