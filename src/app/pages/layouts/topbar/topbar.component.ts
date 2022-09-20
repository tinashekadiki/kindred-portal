import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  userName: any;
  role:any

  constructor() { }

  ngOnInit(): void {
    this.userName = localStorage.getItem('myname');
    this.role = localStorage.getItem('pl_r37PnlX_dSmhd');

  }

}
