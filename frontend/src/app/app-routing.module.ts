import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppComponent } from './app.component';
import { WidgetsComponent } from './widgets/widgets.component';
import { DisplayServicesComponent } from './display-services/display-services.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'home', component: AppComponent },
  { path: 'widget', component: WidgetsComponent},
  { path: 'services', component: DisplayServicesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingArrayOfComponent = [
  LoginComponent,
  RegisterComponent,
  WidgetsComponent,
  DisplayServicesComponent
];
