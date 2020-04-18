import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  isAuth = localStorage.getItem('jwtToken') ? true : false;

  constructor(private _router: Router) {
      
  }

  ngOnInit() {
      this._router.navigate(['services']);
  }

  onLogOut(event) {
    this.isAuth = event;
  }
}



