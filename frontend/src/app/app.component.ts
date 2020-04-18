import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  isAuth = localStorage.getItem('jwtToken') ? true : false;
  connecting: boolean = false;

  ngOnInit() {
    console.log('Access token : ' +localStorage.getItem('accessToken'));
    console.log('Refresh token : ' + localStorage.getItem('refreshToken'));
  }

  onChangeConnecting(event) {
    this.connecting = event;
  }
}



