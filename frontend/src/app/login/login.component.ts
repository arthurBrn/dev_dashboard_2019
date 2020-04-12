import {Component, EventEmitter, OnInit, Output} from '@angular/core';
// import { ToastrService } from 'ngx-toastr';

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

  constructor(
    // private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  onLogin() {
    // if (this.email && this.password) {
      console.log('Regular login');
      console.log('email : ' + this.email);
      console.log('password: ' + this.password);
    // } else {
      //this.toastr.error('All fields must be filled.');
    //}

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
