import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display-services',
  templateUrl: './display-services.component.html',
  styleUrls: ['./display-services.component.css']
})
export class DisplayServicesComponent {


  services = [];
  serviceClicked;
  widgets = new Map([]);


  constructor(private _apiService: ApiService, private _router: Router) { }

  ngOnInit(): void {
    this._apiService.getPublicServices().subscribe((data) => {
        
        let parsedData = data as any;
        for (let i = 0; i < parsedData.length; i++) {
            this.widgets.set(parsedData[i].id.toString(), parsedData[i].name);
            this.services.push({
               title: parsedData[i].name,
               image: parsedData[i].picture,
               id: parsedData[i].id
            });
        }
    });
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
