import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CsvModule } from '@ctrl/ngx-csv';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './pages/layouts/landing/landing.component';
import { TopbarComponent } from './pages/layouts/topbar/topbar.component';
import { SidebarComponent } from './pages/layouts/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { UserVerificationComponent } from './pages/user-verification/user-verification.component';
import { RefferralsComponent } from './pages/refferrals/refferrals.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { UsersComponent } from './pages/users/users.component';
import { FacilitiesComponent } from './pages/facilities/facilities.component';
import { SpecialityComponent } from './pages/speciality/speciality.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { NewFacilityComponent } from './pages/new-facility/new-facility.component';
import { NewTeamComponent } from './pages/new-team/new-team.component';
import { NewSpecialityComponent } from './pages/new-speciality/new-speciality.component';
import { UserDashComponent } from './pages/user-side/user-dash/user-dash.component';
import { RosterComponent } from './pages/user-side/roster/roster.component';
import { UserSideBarComponent } from './pages/user-side/user-side-bar/user-side-bar.component';
import { DraggerComponent } from './pages/user-side/dragger/dragger.component';
import { RefhomeComponent } from './pages/user-side/refferals/refhome/refhome.component';
import { RefcreateComponent } from './pages/user-side/refferals/refcreate/refcreate.component';
import { AlphabetFilterModule } from 'alphabet-filter';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { RefviewComponent } from './pages/user-side/refview/refview.component';
import {NotifierModule} from "angular-notifier";
@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    TopbarComponent,
    SidebarComponent,
    DashboardComponent,
    UserVerificationComponent,
    RefferralsComponent,
    ReportsComponent,
    UsersComponent,
    FacilitiesComponent,
    SpecialityComponent,
    TeamsComponent,
    NewFacilityComponent,
    NewTeamComponent,
    NewSpecialityComponent,
    UserDashComponent,
    RosterComponent,
    UserSideBarComponent,
    DraggerComponent,
    RefhomeComponent,
    RefcreateComponent,
    NotfoundComponent,
    RefviewComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AlphabetFilterModule,
    CsvModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule,
    NotifierModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
