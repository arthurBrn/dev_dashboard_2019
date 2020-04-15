import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApiServices } from '../services/api.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() validCrendentialEvent = new EventEmitter();
  modalRef: BsModalRef;
  valideCredentialValue: boolean;
  forgottenPassword = false;
  mailAddressForForgottenPassword: string;
  email: string;
  password: string;
  isAuth: boolean;

  constructor(
    private _toastr: ToastrService,
    private _modalService: BsModalService,
    private _apiService: ApiServices,
  ) { }

  ngOnInit(): void {
  }

  onLogin() {
    if (this.email && this.password) {
      console.log('Regular login');
      console.log('email : ' + this.email);
      console.log('password: ' + this.password);
      this._apiService.login({email: this.email, password: this.password}).subscribe((data) => {
        console.log('in the promises');
        var parsedData = data as any;
        if (parsedData.status === 200) {
          console.log('USER ID : ' + parsedData.userId);
          console.log('USER LOGGED IN');
          this.isAuth = true;
          console.log('IS AUTH : ' + this.isAuth);
          localStorage.setItem('login', parsedData.userId);
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
