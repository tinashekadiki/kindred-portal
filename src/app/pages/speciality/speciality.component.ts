import { DataService } from './../../api/data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-speciality',
  templateUrl: './speciality.component.html',
  styleUrls: ['./speciality.component.scss'],
})
export class SpecialityComponent implements OnInit {
  noData: Boolean = false;
  allSpecialities: any;

  focusSpeciality = {
    specId: '',
    sub_speciality: [],
    team: [],
    _id: '',
    name: '',
    profession: '',
    practitioner: '',
    creator: '',
  };

  constructor(private spinner: NgxSpinnerService, private data: DataService) {}

  ngOnInit(): void {
    this.getAllSpecialities();
  }

  showIndividualSpeciality(spec:any) {
    this.focusSpeciality = spec
    this.noData = true;
  }

  getAllSpecialities() {
    this.spinner.show();
    this.data.getAllSpecialities().subscribe(
      (specialities) => {
        this.allSpecialities = specialities;
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
      }
    );
  }

  updateSpeciality() {
    this.spinner.show();
    this.data.updateSpeciality(this.focusSpeciality,this.focusSpeciality.specId).subscribe(
      (speciality) => {
        this.getAllSpecialities();
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        alert('unexpected error')
      }
    );
  }

  deleteSpeciality () {
    this.spinner.show();
    this.data.deleteSpeciality(this.focusSpeciality.specId).subscribe(
      (speciality) => {
        this.getAllSpecialities();
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        alert('unexpected error')
      }
    );
  }
}
