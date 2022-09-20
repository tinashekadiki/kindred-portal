import { NgxSpinnerService } from 'ngx-spinner';
import { DataService } from './../../api/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-facility',
  templateUrl: './new-facility.component.html',
  styleUrls: ['./new-facility.component.scss'],
})
export class NewFacilityComponent implements OnInit {
  facility = {
    name: '',
    email: '',
    province: '',
    address: '',
    facility_type: '',
    level: '',
    phone: '',
    country: '',
    region: '',
    cluster: '',
    lat_longitude: '',
    working_hours: '',
  };

  countries : any = [];
  states : any = [];
  regions : any = [];


  constructor(private data: DataService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.getAllCountries();
    this.getRegions()
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
    this.facility.lat_longitude = lat + ',' + long;
  }


  createFacility(): void {
    this.spinner.show();
    this.data.createFacility(this.facility).subscribe(
      data => {
        this.spinner.hide();
        this.facility = {
          name: '',
          email: '',
          province: '',
          address: '',
          facility_type: '',
          level: '',
          phone: '',
          country: '',
          region: '',
          cluster: '',
          lat_longitude: '',
          working_hours: '',
        };
        alert('New Facility Saved')
      },
      err => {
        alert('Unexpected Error');
        this.spinner.hide();
        console.log(err);
      },
    );
  }

  getRegions(){

    this.spinner.show();
    this.data.getSARegions().subscribe((resp: any) => {
      this.regions = resp;
      this.spinner.hide();
    });

  }
  
}
