import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../../service/weather.service';
import {ToastrService} from "ngx-toastr";
import {ApiService} from "../../../service/api.service";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-airqualitycurrent',
  templateUrl: './airqualitycurrent.component.html',
  styleUrls: ['./airqualitycurrent.component.css']
})
export class AirqualitycurrentComponent implements OnInit {

  city: string;
  country: string;
  accessToken : string;
  tableName: string = "airqualitycurrent";

  constructor(
    private _weatherService: WeatherService,
    private _userService: ApiService,
    private _toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.accessToken = localStorage.getItem('accessToken');
  }

  onValidateNewWidget() {
    console.log('city : ' + this.city);
    console.log('country : ' + this.country);
    if (this.city && this.country) {
      // Get the widget id that correspond to the name of the table, to add it in widget_user
      this._userService.getWidgetIdFromName(this.tableName).subscribe((data) => {
        let parsed = data as any;
        if (parsed.code === 200) {
          // Add the user and widget id to table user_widget in userdb
          this._userService.setUserWidget(this.accessToken, parsed.widgetId).subscribe((dataFromSet) => {
            let dataFromSetWidget = dataFromSet as any;
            if (dataFromSetWidget === 200) {
              console.log('User and widget id added to user_widget');
            } else {
              this._toastr.warning('Error in the process.');
            }
          });
          // Add new widget and its params to the right table in weatherdb
          this._weatherService.addWeatherWidget(this.accessToken, this.tableName, this.city, this.country).subscribe((dataWeatherWidget) => {
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
      // Add in weatherdb - tableName, the new widget chosen by the user
    }
  }

}
