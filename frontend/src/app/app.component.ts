import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  isAuth = localStorage.getItem('accessToken') ? true : false;

  constructor(private _router: Router) {

  }

  ngOnInit() {
      console.log('Access token : ' +localStorage.getItem('accessToken'));
    console.log('Refresh token : ' + localStorage.getItem('refreshToken'));
    // this._router.navigate(['']);
  }

  onLogOut(event) {
    this.isAuth = event;
  }
}



