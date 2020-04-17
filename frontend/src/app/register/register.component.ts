import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { ApiService } from '../service/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

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
    private _location: Location,
    private _router: Router,
  ) { }

  ngOnInit(): void {
  }

  onRegisterEvent() {
    if (this.firstName && this.lastName && this.email && this.password) {
      this._apiService.register(
        {
          firstName: this.firstName,
          lastName: this.lastName,
          mail: this.email,
          password: this.password
        }).subscribe((data) => {
        var parsedData = data as any;
        if (parsedData.code === 200) {
          console.log('Were here');
          this._location.replaceState('/')
          this._router.navigate(['login']);
        } else {
          console.log(parsedData.success);
          this._toastr.warning('Registration failed. Contact managment.');
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
