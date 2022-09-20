import { NgxSpinnerService } from 'ngx-spinner';
import { DataService } from './../../api/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-team',
  templateUrl: './new-team.component.html',
  styleUrls: ['./new-team.component.scss'],
})
export class NewTeamComponent implements OnInit {
  newTeam = {
    name: '',
    facility: '',
    type: '',
    speciality: '',
    subspeciality: '',
    phone: '',
    email: '',
    country: '',
    province: '',
    region: '',
    ref_cluster: '',
    address: '',
    lat_longitude: '',
    working_hours: '',
  };

  countries : any = [];
  states : any = [];
  regions : any = [];


  constructor(private data: DataService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.getAllCountries();
    this.getRegions();
  }

  createTeam () {
    this.spinner.show();
    this.data.createTeam(this.newTeam).subscribe(
      data => {
        this.spinner.hide();
        this.newTeam = {
          name: '',
          facility: '',
          type: '',
          speciality: '',
          subspeciality: '',
          phone: '',
          email: '',
          country: '',
          province: '',
          region: '',
          ref_cluster: '',
          address: '',
          lat_longitude: '',
          working_hours: '',
        };
        alert('Team created successfully');
      },
      err => {
        this.spinner.hide();
        console.log(err);
        alert('Error creating team');
      }
    );
  }

  getAllCountries() {
    this.data.getAllCountries().subscribe((resp: any) => {
      this.countries = resp;
    });
  }

  getAllStates(country: any) {
    this.spinner.show();
    this.data.getAllStates(country).subscribe((resp: any) => {
      this.states = resp;
      console.log(this.states);
      this.spinner.hide();
    });
  }

  setLatitudeLongitude(lat: any, long: any) {
    this.newTeam.lat_longitude = lat + ',' + long;
  }

  getRegions(){

    this.spinner.show();
    this.data.getSARegions().subscribe((resp: any) => {
      this.regions = resp;
      this.spinner.hide();
    });

  }
}
