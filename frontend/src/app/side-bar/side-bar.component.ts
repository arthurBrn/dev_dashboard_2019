import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor(
      private _apiService: ApiService,
      private _router: Router
    ) { }

  searchWidget;
  widgetList = [];
  

  ngOnInit(): void {
    this._apiService.getWWidgetList().subscribe((data) => {
      let datas = data as any;
      datas.forEach(element => {
          if (element.public || localStorage.getItem('accessToken')) {
            this.widgetList.push({
              name: element.name,
              service: element.label,
              icon: element.icon
            });
          }
      });
    });
  }

  onWidgetClick(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    $('li').removeClass('active stylish-color');
    $('#' + target.id).addClass('active stylish-color');
    this._router.navigate([`configure-${target.id}`]);
    console.log(target.id);
  }
}
