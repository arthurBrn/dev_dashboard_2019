import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
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
import { CryptocurrenciesComponent } from './widgets/cryptocurrencies/cryptocurrencies.component';
import { WeatherComponent } from './widgets/weather/weather.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { GoogleChartsModule } from 'angular-google-charts';
import { LineChartComponent } from './widgets/cryptocurrencies/line-chart/line-chart.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { HistoryChartComponent } from './widgets/cryptocurrencies/history-chart/history-chart.component';
import { CryptoListComponent } from './widgets/cryptocurrencies/crypto-list/crypto-list.component';
registerLocaleData(localeFr);
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { RateExchangeComponent } from './widgets/cryptocurrencies/rate-exchange/rate-exchange.component';

@NgModule({
  declarations: [
    AppComponent,
    routingArrayOfComponent,
    NavbarComponent,
    SideBarComponent,
    DisplayServicesComponent,
    ServiceCardComponent,
    CryptocurrenciesComponent,
    WeatherComponent,
    LineChartComponent,
    HistoryChartComponent,
    CryptoListComponent,
    RateExchangeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    HttpClientModule,
    MatGridListModule,
    MatCardModule,
    GoogleChartsModule,
    Ng2SearchPipeModule,
    
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
