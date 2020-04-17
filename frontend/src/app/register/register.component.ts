import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { ApiService } from '../service/api.service';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private _toastr: ToastrService,
    private _apiService: ApiService,
  ) { }

  ngOnInit(): void {
  }

  onRegisterEvent() {
    /* console.log('regular register');
    console.log('firstname : ' + this.firstName);
    console.log('lastname : ' + this.lastName);
    console.log('email : ' + this.email);
    console.log('password : ' + this.password); */
    if (this.firstName && this.lastName && this.email && this.password) {
      this._apiService.register({ firstName: this.firstName, lastName: this.lastName, mail: this.email, password: this.password }).subscribe((data) => {
        var parsedData = data as any;
        if (parsedData.code === 200) {
          console.log(parsedData.code);
          console.log(parsedData.success);
        } else {
          console.log(parsedData.success);
        }
      });
    } else {
      this._toastr.warning('All fields must be filled.');
    }
  }

  onRegisterWithFacebook() {
    console.log('register with facebook');
  }

  onRegisterWithGoogle() {
    console.log('register with google');
  }

}
