import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApiService } from '../service/api.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';

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
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onLogin() {
    if (this.email && this.password) {
      this._apiService.login(this.email, this.password).subscribe((data) => {
        var parsedData = data as any;
        if (parsedData.code === 200) {
          localStorage.setItem('accessToken', parsedData.accessToken);
          localStorage.setItem('refreshToken', parsedData.refreshToken);
          console.log(localStorage.getItem('accessToken'));
          console.log(localStorage.getItem('refreshToken'));
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
    let socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    this._authService.signIn(socialPlatformProvider).then(
      (userData) => {
          this._apiService.login(userData.email, userData.id).subscribe((data) => {
            var parsedData = data as any;
            if (parsedData.code === 200) {
                localStorage.setItem('accessToken', parsedData.accessToken);
                localStorage.setItem('refreshToken', parsedData.refreshToken);
                this._apiService.updateToken({ provider: 'facebook', token: userData.authToken, idUser: parsedData.userId }).subscribe((data) => console.log(data));
                console.log(localStorage.getItem('accessToken'));
                console.log(localStorage.getItem('refreshToken'));
                window.location.reload();
                this._location.replaceState('/');
                this._router.navigate(['home']);
                window.location.reload();
            } else {
              this._toastr.warning(parsedData.success);
            }
        });
       }
    );
  }

  onGoogleConnection() {
    console.log('Login through google');
  }


}
