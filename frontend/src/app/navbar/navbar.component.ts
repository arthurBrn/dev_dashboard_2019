import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  authenticated = false;
  @Output() connecting = new EventEmitter();
  @Input() isAuth: boolean;

  constructor(
    private _router: Router,
  ) { }

  ngOnInit(): void {
  }

  onLogoClick() {
    console.log('logo click, redirect to home');
  }

  onLoginClick() {
    this._router.navigate(['login']);
  }

  onRegisterClick() {
    this.connecting.emit(true);
    this._router.navigate(['register']);
  }

}
