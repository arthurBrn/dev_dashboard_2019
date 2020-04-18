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
  @Output() connecting = new EventEmitter();
  @Output() logOut = new EventEmitter();
  @Input() isAuth: boolean;

  constructor(
    private _router: Router,
    private _location: Location,
  ) { }

  ngOnInit(): void {
  }

  onLogoClick() {
    console.log('logo click, redirect to home');
  }

  onInfoClick() {
    alert('Info page in construction. For more information contact the maintenance guy');
  }

  onLogoutClick() {
    alert('Logging you out ...');
    this.logOut.emit(false);
    localStorage.clear();
    this._location.replaceState('/');
    this._router.navigate(['home']);
    window.location.reload();
  }

  onLoginClick() {
    this.connecting.emit(true);
    this._router.navigate(['login']);
  }

  onRegisterClick() {
    this.connecting.emit(true);
    this._router.navigate(['register']);
  }

}
