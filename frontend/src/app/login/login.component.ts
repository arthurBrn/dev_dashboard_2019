import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApiService } from '../service/api.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() validCrendentialEvent = new EventEmitter();
  modalRef: BsModalRef;
  forgottenPassword = false;
  mailAddressForForgottenPassword: string;
  email: string = "";
  password: string = "";
  jwtToken: string = "";
  doesEmailExistInDatabase: boolean = false;

  constructor(
    private _toastr: ToastrService,
    private _modalService: BsModalService,
    private _apiService: ApiService,
    private _location: Location,
    private _router: Router,
  ) { }

  ngOnInit(): void {
  }

  onLogin() {
    if (this.email && this.password) {
      this._apiService.login(this.email, this.password).subscribe((data) => {
        console.log('we enter here ');
        var parsedData = data as any;
        if (parsedData.code === 200) {
          localStorage.setItem('jwtToken', parsedData.accessToken);
          console.log(localStorage.getItem('jwtToken'));

          window.location.reload();
          this._location.replaceState('/');
          this._router.navigate(['home']);
          window.location.reload();
        } else {
          this._toastr.warning(parsedData.success);
        }
      });
    } else {
      this._toastr.warning('All fields must be filled.');
    }
  }

  onForgottenPasswordClick(template: TemplateRef<any>) {
    this.modalRef = this._modalService.show(template);
  }

  onForgottenPasswordChange() {
    this._modalService.hide(1);

    console.log(this.mailAddressForForgottenPassword);
  }

  onFacebookConnection() {
    console.log('Login through facebook');
  }

  onGoogleConnection() {
    console.log('Login through google');
  }


}
