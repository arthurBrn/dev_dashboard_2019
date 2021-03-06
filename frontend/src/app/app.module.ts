import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppRoutingModule, routingArrayOfComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NavbarComponent } from './navbar/navbar.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SideBarComponent } from './side-bar/side-bar.component';
import { DisplayServicesComponent } from './display-services/display-services.component';
import { HttpClientModule } from '@angular/common/http';
import { CryptocurrenciesComponent } from './widgets/cryptocurrencies/cryptocurrencies.component';
import { WeatherComponent } from './widgets/weather/weather.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { GoogleChartsModule } from 'angular-google-charts';
import { LineChartComponent } from './widgets/cryptocurrencies/line-chart/line-chart.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HistoryChartComponent } from './widgets/cryptocurrencies/history-chart/history-chart.component';
import { CryptoListComponent } from './widgets/cryptocurrencies/crypto-list/crypto-list.component';
registerLocaleData(localeFr);
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { RateExchangeComponent } from './widgets/cryptocurrencies/rate-exchange/rate-exchange.component';
import { ConfigureGraphComponent } from './widgets/cryptocurrencies/configure-graph/configure-graph.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { SocialLoginModule, AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { getAuthServiceConfigs } from './socialloginConfig';
import { ConfGraphComponent } from './configure/crypto/conf-graph/conf-graph.component';
import { ConfRateComponent } from './configure/crypto/conf-rate/conf-rate.component';
import { AirqualitycurrentComponent } from './configure/weather/airqualitycurrent/airqualitycurrent.component';
import { WeatherforecastComponent } from './configure/weather/weatherforecast/weatherforecast.component';
import { AirqualityforecastComponent } from './configure/weather/airqualityforecast/airqualityforecast.component';
import { WeathercurrentComponent } from './configure/weather/weathercurrent/weathercurrent.component';
import { ForecastAirQualityComponent } from './widgets/weather/forecast-air-quality/forecast-air-quality.component';
import { CurrentAirQualityComponent } from './widgets/weather/current-air-quality/current-air-quality.component';
import { ForecastWeatherComponent } from './widgets/weather/forecast-weather/forecast-weather.component'

@NgModule({
  declarations: [
    AppComponent,
    routingArrayOfComponent,
    NavbarComponent,
    SideBarComponent,
    DisplayServicesComponent,
    CryptocurrenciesComponent,
    WeatherComponent,
    LineChartComponent,
    HistoryChartComponent,
    CryptoListComponent,
    RateExchangeComponent,
    ConfigureGraphComponent,
    ConfGraphComponent,
    ConfRateComponent,
    AirqualitycurrentComponent,
    WeatherforecastComponent,
    AirqualityforecastComponent,
    WeathercurrentComponent,
    ForecastAirQualityComponent,
    CurrentAirQualityComponent,
    ForecastWeatherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    HttpClientModule,
    MatGridListModule,
    MatCardModule,
    GoogleChartsModule,
    Ng2SearchPipeModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    SocialLoginModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    { provide: AuthServiceConfig, useFactory: getAuthServiceConfigs },
   //  { provide: AuthServiceConfig, useFactory: provideConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
