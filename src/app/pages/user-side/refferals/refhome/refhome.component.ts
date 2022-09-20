import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { DataService } from './../../../../api/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-refhome',
  templateUrl: './refhome.component.html',
  styleUrls: ['./refhome.component.scss'],
})
export class RefhomeComponent implements OnInit {
  allForms: any = [];
  showSearch: Boolean = false;

  contacts: any = [];

  constructor(
    private data: DataService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getAllReferralForms();
  }

  selected($event: any) {
    let id = $event.id;
    this.router.navigate([`ref/view/${id}`]);
  }

  getAllReferralForms() {
    this.spinner.show();
    this.data.getAllReferralForms().subscribe(
      (data) => {
        this.spinner.hide();
        this.allForms = data;
        this.allForms.forEach((element: any) => {
          console.log(element.facility);
          this.contacts.push({
            name: element.facility,
            htmlTemp: element.template,
            id: element._id,
          });
        });
        this.showSearch = true;
      },

      (error) => {
        this.spinner.hide();
        console.log(error);
      }
    );
  }
}
