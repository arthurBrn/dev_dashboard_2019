import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppComponent } from './app.component';
import { DisplayServicesComponent } from './display-services/display-services.component';
import { CryptocurrenciesComponent } from  './widgets/cryptocurrencies/cryptocurrencies.component';
import { WeatherComponent } from './widgets/weather/weather.component';
import { WeatherDetailComponent } from './widgets/weather/weather-detail/weather-detail.component';
import { GmailComponent } from './widgets/gmail/gmail.component';
import { ConfGraphComponent } from './configure/crypto/conf-graph/conf-graph.component';
import { ConfRateComponent } from './configure/crypto/conf-rate/conf-rate.component';
import { AirqualitycurrentComponent } from './configure/weather/airqualitycurrent/airqualitycurrent.component';
import { WeatherforecastComponent } from './configure/weather/weatherforecast/weatherforecast.component';
import { AirqualityforecastComponent } from './configure/weather/airqualityforecast/airqualityforecast.component';
import { WeathercurrentComponent } from './configure/weather/weathercurrent/weathercurrent.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'home', component: AppComponent },
  { path: 'services', component: DisplayServicesComponent },
  { path: 'cryptocurrencies', component: CryptocurrenciesComponent},
  { path: 'weather', component: WeatherComponent},
  { path: 'weather/detail',
    component: WeatherDetailComponent,
    data: {id: 1, title: 'title'}
  },
  { path: 'gmail', component: GmailComponent},
  { path: 'configure-graph', component: ConfGraphComponent},
  { path: 'configure-rate', component: ConfRateComponent},
  { path: 'configure-airqualitycurrent', component: AirqualitycurrentComponent},
  { path: 'configure-airqualityforecast', component: AirqualityforecastComponent},
  { path: 'configure-weathercurrent', component: WeathercurrentComponent},
  { path: 'configure-weatherforecast', component: WeatherforecastComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingArrayOfComponent = [
  LoginComponent,
  RegisterComponent,
  DisplayServicesComponent,
  CryptocurrenciesComponent,
  WeatherComponent,
  WeatherDetailComponent,
];
