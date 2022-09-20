import { NgxSpinnerService } from 'ngx-spinner';
import { DataService } from './../../api/data.service';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
})
export class TeamsComponent implements OnInit {

  // for image upload and preview

  imageError: any = '';
  isImageSaved: any = false;
  cardImageBase64: any = '';

  // end of image upload and preview



  allTeams: any;

  noData: Boolean = false;

  userDetails = {
    firstName: 'Omri',
    lastName: 'Marebera',
    email: 'omri@omnisoft.co.zw',
    phone: '03949588',
    country: 'South Africa (+27)',
    typeWorker: 'Dentist',
    regCouncil: 'HPCSA',
    regNumber: 'MP29302',
  };

  constructor(private data: DataService, private spinner: NgxSpinnerService) {}

  teamDetails = {
    teamId: '',
    status: false,
    weekly_status: true,
    beds_total: 0,
    beds_available: 0,
    _id: '',
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
    createdAt: '',
    updatedAt: '',
    photoUrl : '',
  };

  setTeam(team: any) {
    this.teamDetails = team;
    this.teamDetails.photoUrl = team.photoUrl;
    this.noData = true;
  }

  ngOnInit(): void {
    this.getAllTeams();
  }

  showIndividualUser() {
    this.noData = true;
  }

  getAllTeams() {
    this.spinner.show();
    this.data.getAllTeams().subscribe(
      (data) => {
        this.allTeams = data;
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
      }
    );
  }

  updateTeam() {
    this.spinner.show();
    const newTeam = Object.assign({}, this.teamDetails);
    this.data.updateTeam(newTeam, this.teamDetails.teamId).subscribe(
      (data) => {
        this.getAllTeams();
        this.spinner.hide();
      },
      (error) => {
        this.getAllTeams();
        this.spinner.hide();
      }
    );
  }

  deleteTeam() {
    this.spinner.show();
    this.data.deleteTeam(this.teamDetails.teamId).subscribe(
      (data) => {
        this.getAllTeams();
        this.spinner.hide();
      },
      (error) => {
        this.getAllTeams();
        this.spinner.hide();
      }
    );
  }


  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
        const allowed_types = ['image/png', 'image/jpeg'];
        if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
            this.imageError = 'Only Images are allowed ( JPG | PNG )';
            return false;
        }
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = rs => {
                    const imgBase64Path = e.target.result;
                    this.cardImageBase64 = imgBase64Path;
                    this.isImageSaved = true;
                    // this.previewImagePath = imgBase64Path;
                    this.teamDetails.photoUrl = imgBase64Path;
                    console.log(this.cardImageBase64);
                }
        };
        let results =  reader.readAsDataURL(fileInput.target.files[0]);
        return results;
    }
}

removeImage() {

    this.cardImageBase64 = null;
    this.isImageSaved = false;
    this.teamDetails.photoUrl = '';
}
}
