import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './service/api.service';
import {element} from "protractor";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  tokenValue: String;
  isAuth = localStorage.getItem('accessToken') ? true : false;
  data = [];

  constructor(
    private _router: Router,
    private _apiService: ApiService,
  ) {}

  ngOnInit() {
    this.tokenValue = localStorage.getItem('accessToken');

    this._apiService.getUserWidgetsKeys(this.tokenValue).subscribe((data) => {
      let parsed = data as any;
      parsed.forEach(element => {
        console.log(element.label);
      });
    });
  }

  onLogOut(event) {
    this.isAuth = event;
  }
}



