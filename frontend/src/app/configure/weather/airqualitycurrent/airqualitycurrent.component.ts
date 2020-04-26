import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../../service/weather.service';
import {ToastrService} from "ngx-toastr";
import {ApiService} from '../../../service/api.service';
import { FormsModule } from '@angular/forms';
import {Router} from "@angular/router";

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
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.accessToken = localStorage.getItem('accessToken');
  }

  onValidateNewWidget() {
    if (this.city && this.country) {
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
          this._weatherService.addWeatherWidget(this.accessToken, this.tableName, this.city, this.country).subscribe((dataWeatherWidget) => {
            let parsedData = dataWeatherWidget as any;
            if (parsedData.code === 200) {
              console.log('New widget added in weatherdb');
              this._router.navigate(['/services']);
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
