import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() registerEvent = new EventEmitter();

  registerEventValue: boolean;
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  constructor() { }

  ngOnInit(): void {
  }

  onRegisterEvent() {
    console.log('regular register');
    console.log('firstname : ' + this.firstName);
    console.log('lastname : ' + this.lastName);
    console.log('email : ' + this.email);
    console.log('password : ' + this.password);
  }

  onRegisterWithFacebook() {
    console.log('register with facebook');
  }

  onRegisterWithGoogle() {
    console.log('register with google');
  }

}
