import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-display-services',
  templateUrl: './display-services.component.html',
  styleUrls: ['./display-services.component.css']
})
export class DisplayServicesComponent {


  services = [];
  serviceClicked;
  widgets = new Map([]);


  constructor(
    private _apiService: ApiService,
    private _router: Router,
    private _location: Location,
  ) { }

  ngOnInit(): void {
    // this._apiService.getPublicServices().subscribe((data) => {
    //     let parsedData = data as any;
    //     for (let i = 0; i < parsedData.length; i++) {
    //         if (parsedData[i].public == 1 || localStorage.getItem('accessToken')) {
    //             this.widgets.set(parsedData[i].id.toString(), parsedData[i].name);
    //                 this.services.push({
    //                 title: parsedData[i].name,
    //                 image: parsedData[i].picture,
    //                 id: parsedData[i].id
    //             });
    //         }
    //     }
    // });

    console.log('widgets : ' + this._location.getState()['ourWidgets']);
  }

  onServiceSelectionned(event) {
      const widget = this.widgets.get(event);
      if(widget != 'comming soon') {
          this._router.navigate([ widget ]);
      } else {
          console.log('not implemented yet');
      }

  }
}
