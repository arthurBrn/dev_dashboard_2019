import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { ApiService } from '../service/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';

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
    private _authService: AuthService,
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
          console.log('GROS FAIL');
          console.log(parsedData.success);
          this._toastr.warning('Registration failed. Contact managment.');
        }
      });
    } else {
      this._toastr.warning('All fields must be filled.');
    }
  }

//   onRegisterWithGoogle() {
    // let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    // this._authService.signIn(socialPlatformProvider).then(
    //   (userData) => {
    //       let token = userData.authToken;
    //       let user = {
    //         firstName: userData.firstName,
    //         lastName: userData.lastName,
    //         mail: userData.email,
    //         password: userData.id
    //       }
    //       this._apiService.register(user).subscribe((data) => {
    //           let parseData = data as any;
    //           let nb = parseData.insertedId as number
    //           this._apiService.insertToken({
    //             provider: 'google',
    //             token: token,
    //             idUser: nb // on enverra le token
    //           }).subscribe((datas) => this._router.navigate(['login']));
    //       });
    //    }
    // );
//   }

  signInWithFB(): void {
    let socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    this._authService.signIn(socialPlatformProvider).then(
      (userData) => {
          let token = userData.authToken;
          let user = {
            firstName: userData.firstName,
            lastName: userData.lastName,
            mail: userData.email,
            password: userData.id
          }
          this._apiService.register(user).subscribe((data) => {
              let parseData = data as any;
              let nb = parseData.insertedId as number
              this._apiService.insertToken({
                provider: 'facebook',
                token: token,
                idUser: nb
              }).subscribe((datas) => this._router.navigate(['login']));
          });
       }
    );
  }

}
