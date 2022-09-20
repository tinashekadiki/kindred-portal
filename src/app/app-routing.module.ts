import { IsloggedGuard } from './guards/islogged.guard';
import { RefviewComponent } from './pages/user-side/refview/refview.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { RefcreateComponent } from './pages/user-side/refferals/refcreate/refcreate.component';
import { RefhomeComponent } from './pages/user-side/refferals/refhome/refhome.component';
import { DraggerComponent } from './pages/user-side/dragger/dragger.component';
import { RosterComponent } from './pages/user-side/roster/roster.component';
import { UserDashComponent } from './pages/user-side/user-dash/user-dash.component';
import { NewSpecialityComponent } from './pages/new-speciality/new-speciality.component';
import { NewTeamComponent } from './pages/new-team/new-team.component';
import { NewFacilityComponent } from './pages/new-facility/new-facility.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { SpecialityComponent } from './pages/speciality/speciality.component';
import { FacilitiesComponent } from './pages/facilities/facilities.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { RefferralsComponent } from './pages/refferrals/refferrals.component';
import { UserVerificationComponent } from './pages/user-verification/user-verification.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LandingComponent } from './pages/layouts/landing/landing.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';


const routes: Routes = [
  {
    path:'landing',
    component: LandingComponent
  },
  {
    path:'',
    component: LandingComponent
  },
  {
    path:'ref/edit/:id/:name',
    component: DraggerComponent
  },
  {
    path:'ref/view/:id',
    component: RefviewComponent
  },
  {
    path:'ref/home',
    component: RefhomeComponent,
    
  },
  {
    path: 'ref/new',
    component: RefcreateComponent,
    
  },
  {
    path:'dashboard',
    component: DashboardComponent,
    
  },
  {
    path:'teams',
    component: TeamsComponent,
    
  },
  {
    path:'teams/new',
    component: NewTeamComponent,
    
  },
  {
    path:'userverification',
    component: UserVerificationComponent,
    
  },
  {
    path:'facilities/new',
    component: NewFacilityComponent,
    
  },
  {
    path:'refferals',
    component: RefferralsComponent,
    
  },
  {
    path:'reports',
    component: ReportsComponent,
    
  },
  {
    path:'users',
    component: UsersComponent,
    
  },
  {
    path:'facilities',
    component: FacilitiesComponent,
    
  },
  {
    path:'speciality',
    component: SpecialityComponent,
    
  },
  {
    path:'speciality/new',
    component: NewSpecialityComponent,
    
  },
  {
    path:'me/dash',
    component: UserDashComponent,
    
  },
  {
    path:'me/roster',
    component: RosterComponent,
    
  },
  {
    path:'**',
    component: NotfoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
