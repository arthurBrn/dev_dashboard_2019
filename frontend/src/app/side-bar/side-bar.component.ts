import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

interface widgetIt {
    id: number;
    name: string;
    label: string;
}

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor(private _apiService: ApiService) { }

  searchWidget;
  widgetList = [];
  

  ngOnInit(): void {
    if(localStorage.getItem('refreshToken')) {
      this._apiService.getWWidgetList().subscribe((data) => {
        console.log(data);
        let datas = data as any;
        datas.forEach(element => {
          this.widgetList.push({
            id: element.id,
            name: element.name,
            service: element.label,
            icon: element.icon
          })
        });
      });
    }
  }

  onWidgetClick(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    $('li').removeClass('active');
    $('#' + target.id).addClass('active');
    console.log(target.id);
  }
}
