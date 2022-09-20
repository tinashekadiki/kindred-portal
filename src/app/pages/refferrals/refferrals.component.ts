import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-refferrals',
  templateUrl: './refferrals.component.html',
  styleUrls: ['./refferrals.component.scss']
})
export class RefferralsComponent implements OnInit {

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
  }

  constructor() { }

  ngOnInit(): void {
  }

  showIndividualUser() {
    this.noData = true;
  }

}
