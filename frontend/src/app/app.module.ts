import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule, routingArrayOfComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NavbarComponent } from './navbar/navbar.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ApiServices} from './services/api.services';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    routingArrayOfComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    HttpClientModule,
  ],
  providers: [
    ApiServices,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
