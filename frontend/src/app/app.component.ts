import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  isAuth = true;
  connecting: boolean = false;

  onChangeConnecting(event) {
    this.connecting = event;
  }

}



