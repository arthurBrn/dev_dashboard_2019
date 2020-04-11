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

  onLogin() {
    console.log('Regular login');
    console.log('email : ' + this.email);
    console.log('password: ' + this.password);

  }

  onPasswordForgotten() {
    console.log('forgotten password method');
  }

  onFacebookConnection() {
    console.log('Login through facebook');
  }

  onGoogleConnection() {
    console.log('Login through google');
  }

}
