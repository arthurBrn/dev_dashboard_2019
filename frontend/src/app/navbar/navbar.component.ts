import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

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
  ) { }

  ngOnInit(): void {
  }

  onLogoClick() {
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
  }

  onLoginClick() {
    this._router.navigate(['login']);
  }

  onRegisterClick() {
    this._router.navigate(['register']);
  }

}
