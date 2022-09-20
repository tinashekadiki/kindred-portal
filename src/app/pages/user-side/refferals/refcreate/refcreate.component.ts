import { Router } from '@angular/router';
import { DataService } from './../../../../api/data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-refcreate',
  templateUrl: './refcreate.component.html',
  styleUrls: ['./refcreate.component.scss'],
})
export class RefcreateComponent implements OnInit {
  form: any = {
    speciality: '',
    subspeciality: '',
    facility: '',
    teams: '',
    template: [],
  };

  allSpecialitie: any = []
  allSubSpecialitie: any = []
  allFacilities: any = []
  allTeams: any =[]

  constructor(private spinner: NgxSpinnerService, private data: DataService, private router: Router) {}

  ngOnInit(): void {
    this.getAllSpecialities();
  }

  createReferralForm() {
    this.spinner.show();
    console.log(this.form);
    this.data.createReferralForm(this.form).subscribe(
      (res:any) => {
        this.spinner.hide();
        let id = res.message._id;
        let name = res.message.facility;
        this.router.navigate([`/ref/edit/${id}/${name}`]);
        console.log(res);
      },
      (err:any) => {
        this.spinner.hide();
        alert(err.message);
      }
    );
  }

  getAllSpecialities() {
    this.spinner.show();
    this.data.getAllSpecialities().subscribe(
      (res) => {
        this.spinner.hide();
        this.allSpecialitie = res;
      },
      (err) => {
        this.spinner.hide();
        alert(err.message);
      }
    );
  }

  getAllSubSpecialities() {
    this.spinner.show();
    this.data.getAllSubSpecialities(this.form.speciality).subscribe(
      (res) => {
        this.spinner.hide();
        this.allSubSpecialitie = res;
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  getAllFacilities() {
    this.spinner.show();
    this.data.getAllFacilities().subscribe(
      (res) => {
        this.spinner.hide();
        this.allFacilities = res;
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  getTeamBySpeciality() {
    this.spinner.show();
    this.data.getTeamBySpeciality(this.form.speciality).subscribe(
      (res) => {
        this.spinner.hide();
        this.allTeams = res;
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }
  

}
