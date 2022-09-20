import { NgxSpinnerService } from 'ngx-spinner';
import { DataService } from './../../api/data.service';
import { Component, OnInit } from '@angular/core';
import {NotifierService} from "angular-notifier";

@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.scss'],
})
export class FacilitiesComponent implements OnInit {
  allFacilities: any;
  noData: Boolean = false;
  countries : any = [];
  states : any = [
    {
      "name": "Eastern Cape",
      "code": "ZA-EC"
    },
    {
      "name": "Free State",
      "code": "ZA-FS"
    },
    {
      "name": "Gauteng",
      "code": "ZA-GT"
    },
    {
      "name": "KwaZulu-Natal",
      "code": "ZA-NL"
    },
    {
      "name": "Limpopo",
      "code": "ZA-LP"
    },
    {
      "name": "Mpumalanga",
      "code": "ZA-MP"
    },
    {
      "name": "North West",
      "code": "ZA-NW"
    },
    {
      "name": "Northern Cape",
      "code": "ZA-NC"
    },
    {
      "name": "Western Cape",
      "code": "ZA-WC"
    }
  ];


  focusFacility = {
    facilityId: '',
    status: false,
    _id: '',
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
    team: []
  };

  constructor(private data: DataService, private spinner: NgxSpinnerService, private notifierService: NotifierService) {}

  ngOnInit(): void {
    this.getAllFacilities();
    this.getAllCountries();
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
    this.focusFacility.lat_longitude = lat + ',' + long;
  }

  showIndividualFacility(fac: any) {
    this.focusFacility = fac;
  }

  getAllFacilities = () => {
    this.spinner.show();
    this.data.getAllFacilities().subscribe(
      (data: any) => {
        this.allFacilities = data;
        this.spinner.hide();
      },
      (error) => {
        console.log(error);
        this.spinner.hide();
      }
    );
  };

  updateFacility = () => {
    this.spinner.show();
    this.data.updateFacility(this.focusFacility,this.focusFacility.facilityId).subscribe(
      (data: any) => {
        this.spinner.hide();
        this.getAllFacilities();
        this.notifierService.notify('success', 'Facility updated successfully')
      },
      (error) => {
        // alert('Unexpected Error')
        console.log(error);
        this.spinner.hide();
        this.notifierService.notify('error', 'Failed to update facility')
      }
    );
  }

  deleteFacility = () => {
    this.spinner.show();
    this.data.deleteFacility(this.focusFacility.facilityId).subscribe(
      (data: any) => {
        this.spinner.hide();
        this.getAllFacilities();
        this.notifierService.notify('success', 'Facility deleted successfully')
      },
      (error) => {
        alert('Unexpected Error')
        console.log(error);
        this.spinner.hide();
        this.notifierService.notify('error', 'Failed to delete facility')
      }
    );
  }
}
