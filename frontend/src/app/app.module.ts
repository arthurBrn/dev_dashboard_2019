import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule, routingArrayOfComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NavbarComponent } from './navbar/navbar.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SideBarComponent } from './side-bar/side-bar.component';
import { DisplayServicesComponent } from './display-services/display-services.component';
import { ServiceCardComponent } from './display-services/service-card/service-card.component';
import { HttpClientModule } from '@angular/common/http';
import { WidgetsComponent } from './widgets/widgets.component';

@NgModule({
  declarations: [
    AppComponent,
    routingArrayOfComponent,
    NavbarComponent,
    SideBarComponent,
    DisplayServicesComponent,
    ServiceCardComponent,
    WidgetsComponent,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
