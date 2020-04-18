import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-display-services',
  templateUrl: './display-services.component.html',
  styleUrls: ['./display-services.component.css']
})
export class DisplayServicesComponent {


  services = [];

  constructor(private _apiService: ApiService) { }

  ngOnInit(): void {
    this._apiService.getPublicServices().subscribe((data) => {
        let parsedData = data as any;
        for (let i = 0; i < parsedData.length; i++) {
           this.services.push({
               title: parsedData[i].name,
               image: parsedData[i].picture
           });
        }
    });
  }
}
