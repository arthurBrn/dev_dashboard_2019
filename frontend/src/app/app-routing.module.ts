import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppComponent } from './app.component';
import { DisplayServicesComponent } from './display-services/display-services.component';
import { CryptocurrenciesComponent } from  './widgets/cryptocurrencies/cryptocurrencies.component';
import { WeatherComponent } from './widgets/weather/weather.component';
import { WeatherDetailComponent } from './widgets/weather/weather-detail/weather-detail.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'home', component: AppComponent },
  { path: 'services', component: DisplayServicesComponent},
  { path: 'cryptocurrencies', component: CryptocurrenciesComponent},
  { path: 'weather', component: WeatherComponent},
  { path: 'weather/detail',
    component: WeatherDetailComponent,
    data: {id: 1, title: 'title'}
  },
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
