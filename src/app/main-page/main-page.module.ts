import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialExampleModule } from '../../material/material.module';
import { RouterModule } from '@angular/router';
import { AnswerPageComponent } from './answer-page/answer-page.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { CreateAnalysisPageComponent } from './create-analysis-page/create-analysis-page.component';
import { MySensoryProfilePageComponent } from './my-sensory-profile-page/my-sensory-profile-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ConnectedUsersComponent } from './connected-users/connected-users.component';
import { SensoryProfilesPageComponent } from './sensory-profiles-page/sensory-profiles-page.component';
import { MyProfilePageComponent } from './my-profile-page/my-profile-page.component';
import { MyAnalysisPageComponent } from './my-analysis-page/my-analysis-page.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { RadioButtonComponent } from './answer-page/radio-button/radio-button.component';
import { SliderComponent } from './answer-page/slider/slider.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    MaterialExampleModule,
    RouterModule,
    NgxMaterialTimepickerModule,

    //AppModule
  ],
  declarations: [
    MainPageComponent,
    AnswerPageComponent,
    CreateAnalysisPageComponent,
    MySensoryProfilePageComponent,
    HomePageComponent,
    ConnectedUsersComponent,
    SensoryProfilesPageComponent,
    MyProfilePageComponent,
    MyAnalysisPageComponent,
    SettingsPageComponent,
    RadioButtonComponent,
    SliderComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainPageModule {}
