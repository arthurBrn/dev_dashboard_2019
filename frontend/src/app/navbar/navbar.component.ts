import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  authenticated = false;
  @Output() logOut = new EventEmitter();
  @Input() isAuth: boolean;

  constructor(
    private _router: Router,
    private _location: Location,
    private _apiService: ApiService,
  ) { }

  ngOnInit(): void {
  }

  onLogoClick() {
    $('li').removeClass('active stylish-color');
    this._router.navigate(['services']);
  }

  onInfoClick() {
    alert('Info page in construction. For more information contact the maintenance guy');
  }

  onLogoutClick() {
    this.logOut.emit(false);
    localStorage.clear();
    this._location.replaceState('/');
    this._router.navigate(['services']);
    window.location.reload();
    this._apiService.logout(localStorage.getItem('refreshToken')).subscribe((data) => {
      console.log('logout route');
      var parsedData = data as any;
      if (parsedData.code ===  200) {
        console.log(parsedData.success);
      } else {
        console.log(parsedData.success);
      }
    });
  }

  onLoginClick() {
    this._router.navigate(['login']);
  }

  onRegisterClick() {
    this._router.navigate(['register']);
  }

}
