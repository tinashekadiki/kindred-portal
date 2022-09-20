import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  public showUserSideBar = false;


  getAllFacilities = () => this.http.get(`${apiUrl}/facility`);

  getAllSpecialities = () => this.http.get(`${apiUrl}/spec`);

  getAllTeams = () => this.http.get(`${apiUrl}/team`);

  updateTeam = (team: Object, id: String) => this.http.put(`${apiUrl}/team/edit/team/${id}`, team);

  deleteTeam = (id: String) => this.http.delete(`${apiUrl}/team/delete/${id}`);

  updateFacility = (facility: Object, id: String) => this.http.put(`${apiUrl}/facility/edit/facility/${id}`, facility);
  
  deleteFacility = (id: String) => this.http.delete(`${apiUrl}/facility/delete/${id}`);

  updateSpeciality = (speciality: Object, id: String) => this.http.put(`${apiUrl}/spec/edit/spec/${id}`, speciality);

  deleteSpeciality = (id: String) => this.http.delete(`${apiUrl}/spec/delete/spec/${id}`);

  createFacility = (facility: Object) => this.http.post(`${apiUrl}/facility`, facility);

  createTeam = (team: Object) => this.http.post(`${apiUrl}/team`, team);

  getTeamBySpeciality = (id: String) => this.http.get(`${apiUrl}/team/filter/spec?specId=${id}`);


  createSpeciality = (speciality: Object) => this.http.post(`${apiUrl}/spec`, speciality);

  createSubSpeciality = (subSpeciality: Object) => this.http.post(`${apiUrl}/subspeciality`, subSpeciality);

  getAllSubSpecialities = (id: String) => this.http.get(`${apiUrl}/subspeciality/filter?specId=${id}`);

  getAllCountries = () => this.http.get(`${apiUrl}/portal/allCountries`);

  getAllStates = (countryId: String) => this.http.get(`${apiUrl}/portal/states?countryCode=${countryId}`);

  getDashboardSummary = (period: String) => this.http.post(`${apiUrl}/reports/filter`,{period: period});

  getReportHistory = (period: String) => this.http.post(`${apiUrl}/reports/history`,{period: period});

  downloadReport = (report: Object) => this.http.post(`${apiUrl}/reports/all`,{report: report});

  prepareForDownload = (report: String) => this.http.get(`${apiUrl}/referrals/reports?type=${report}`);

  getRoster = () => this.http.get(`${apiUrl}/roster`);

  getAdminDashboardReport = (insights: Object) => this.http.put(`${apiUrl}/reports/registrations`,insights);

  getUserDashboardReport = (insights: Object) => this.http.put(`${apiUrl}/reports/user`,insights);

  getAllPatientDiseases = () => this.http.get(`${apiUrl}/patients/diseases`);

  getAllRanksByID = (id: String) => this.http.get(`${apiUrl}/roster/ranks/team?rosterFor=${id}`);

  getAllTeamsByID = (id: String) => this.http.get(`${apiUrl}/roster/teams?userId=${id}`);

  getSARegions = () => this.http.get(`https://kindredd-health-app.herokuapp.com/portal/region?countryCode=ZA`);

  getRosterByType = (rosterDetails: any) => this.http.put(`${apiUrl}/roster/filterAll`,rosterDetails) 

  addToRoster = (rosterDetails: any) => this.http.put(`${apiUrl}/roster/edit`,rosterDetails)

  createReferralForm = (form: Object) => this.http.post(`${apiUrl}/referrals/forms`,form);

  getAllReferralForms = () => this.http.get(`${apiUrl}/referrals/filter/forms`);

  updateReferralForm = (form: Object, id: String) => this.http.put(`${apiUrl}/referrals/edit/forms/${id}`,form);

  getSingleRefForm = (id: String) => this.http.get(`${apiUrl}/referrals/filter/forms/formId?formId=${id}`);

  getRosterUsersToAdd = (rosterDetails: any) => this.http.put(`${apiUrl}/roster/usersFilter`,rosterDetails)

  getAlRosterUsers = () => this.http.get(`${apiUrl}/roster/allUsers`)

  getAlShiftRosterUsers = () => this.http.get(`${apiUrl}/roster/all`)


}


// {
//   "rosterFor": "611a81cb9bff373100d35a0a",
//   "ranks": "interns",
//   "date": "2-Tue",
//   "data": [
//     {
//       "name": "Samuel",
//       "phoneNumber": "02222222222222222222222222",
//       "email": "samuel@gmail.com",
//       "onDuty": true
//     }
//   ]
// }