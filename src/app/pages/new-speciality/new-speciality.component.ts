import { NgxSpinnerService } from 'ngx-spinner';
import { DataService } from './../../api/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-speciality',
  templateUrl: './new-speciality.component.html',
  styleUrls: ['./new-speciality.component.scss'],
})
export class NewSpecialityComponent implements OnInit {
  showSub: Boolean = false;

  speciality = {
    name: '',
    specialist: '',
    profession: '',
    practitioner: '',
    creator: 'Admin',
  };

  subspeciality = {
    name: '',
    profession: '',
    speciality: '',
    practitioner: '',
    creator: 'Admin',
  };


  constructor(private data : DataService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {}

  changeView(item: any) {
    item.target.value === 'sub'
      ? (this.showSub = true)
      : (this.showSub = false);
  }

  createSpeciality () {
    this.spinner.show();
    this.data.createSpeciality(this.speciality).subscribe(
      data => {
        this.spinner.hide();
        this.speciality = {
          name: '',
          specialist: '',
          profession: '',
          practitioner: '',
          creator: 'Admin',
        };
        this.showSub = false;
        alert('Speciality created successfully');
      },
      err => {
        this.spinner.hide();
        console.log(err);
        alert('Error while creating speciality');
      }
    );
  }

  createSubSpeciality () {
    this.spinner.show();
    this.data.createSubSpeciality(this.subspeciality).subscribe(
      data => {
        this.spinner.hide();
        this.subspeciality = {
          name: '',
          profession: '',
          speciality: '',
          practitioner: '',
          creator: 'Admin',
        };
        this.showSub = false;
        alert('Subspeciality created successfully');
      },
      err => {
        this.spinner.hide();
        console.log(err);
        alert('Error while creating subspeciality');
      }
    );
  }

}
