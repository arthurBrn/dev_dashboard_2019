import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() validCrendentialEvent = new EventEmitter();
  valideCredentialValue: boolean;
  email: string;
  password: string;

  constructor() { }

  ngOnInit(): void {
  }

  onPasswordForgotten() {
    console.log('forgotten password method');
  }

  onFacebookConnection() {

  }

  onGoogleConnection() {

  }
}
