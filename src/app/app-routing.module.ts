import { NgModule } from '@angular/core';
import { MainPageComponent } from './main-page/main-page.component';
import { SecondaryPageComponent } from './secondary-page/secondary-page.component';
import { Routes, RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { YourGuard } from './your-guard.guard';
import { ConnexionFormComponent } from './connexion-form/connexion-form.component';
import { CheckPageComponent } from './check-page/check-page.component';
import { FirstItemComponent } from './main-page/first-item/first-item.component';
import { SecondItemComponent } from './main-page/second-item/second-item.component';
import { HomePageComponent } from './main-page/home-page/home-page.component';
import { MySensoryProfilePageComponent } from './main-page/my-sensory-profile-page/my-sensory-profile-page.component';
import { MyAnalysisPageComponent } from './main-page/my-analysis-page/my-analysis-page.component';
import { AnswerPageComponent } from './main-page/answer-page/answer-page.component';
import { CreateAnalysisPageComponent } from './main-page/create-analysis-page/create-analysis-page.component';
import { SettingsPageComponent } from './main-page/settings-page/settings-page.component';
import { MyProfilePageComponent } from './main-page/my-profile-page/my-profile-page.component';
import { AdminGuard } from './main-page/admin.guard';
import { ConnectedUsersComponent } from './main-page/connected-users/connected-users.component';
import { ValidTokenGuard } from './main-page/valid-token.guard';
import { SensoryProfilesPageComponent } from './main-page/sensory-profiles-page/sensory-profiles-page.component';
//import { RegisterFormComponent } from './register-form/register-form.component';
import { CommonModule } from '@angular/common';
import { RadioButtonComponent } from './main-page/answer-page/radio-button/radio-button.component';

//const routes: Routes = []; // sets up routes constant where you define your routes
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: ConnexionFormComponent },
  {
    path: 'dashboard',
    component: MainPageComponent,
    canActivate: [ValidTokenGuard, YourGuard],
    children: [
      {
        path: 'home', // child route path
        component: HomePageComponent, // child route component that the router renders
        canActivate: [ValidTokenGuard],
      },
      {
        path: 'answer',
        component: AnswerPageComponent, // another child route component that the router renders
        canActivate: [ValidTokenGuard],
        children: [
          {
            path: 'MyFirstOne/:id', // child route path
            component: RadioButtonComponent, // child route component that the router renders
            canActivate: [ValidTokenGuard],
          },
        ]
      },
      {
        path: 'my-analysis', // child route path
        component: MyAnalysisPageComponent, // child route component that the router renders
        canActivate: [ValidTokenGuard],
      },
      {
        path: 'my-sensory-profile',
        component: MySensoryProfilePageComponent, // another child route component that the router renders
      },
      {
        path: 'create-analysis', // child route path
        canActivate: [AdminGuard],
        component: CreateAnalysisPageComponent, // child route component that the router renders
      },
      {
        path: 'connected-users', // child route path
        canActivate: [AdminGuard],
        component: ConnectedUsersComponent, // child route component that the router renders
      },
      {
        path: 'sensory-profiles', // child route path
        canActivate: [AdminGuard],
        component: SensoryProfilesPageComponent, // child route component that the router renders
      },
      {
        path: 'settings',
        component: SettingsPageComponent, // another child route component that the router renders
      },
      {
        path: 'profile', // child route path
        component: MyProfilePageComponent, // child route component that the router renders
      },
    ],
  },
  // { path: 'register-component', component: RegisterFormComponent },
  { path: 'create-account', component: SecondaryPageComponent },
  { path: 'check-page-component', component: CheckPageComponent },
  // { path: '**', redirectTo: '/dashboard', pathMatch: 'full' },
];
// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppRoutingModule {}
