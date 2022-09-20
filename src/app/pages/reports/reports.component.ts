import { DataService } from './../../api/data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  reportHistory: any;
  datax = [];
  autoCompleteOpts :any =  [];
  generatedReport = []
  selectedReport = {
    reportFor: '',
    specialityOrSubspeciality: '',
    facility: '',
    teams: '',
    startDate: '',
    endDate: '',
    creator: 'emmanuel',
  };

  constructor(private spinner: NgxSpinnerService, private data: DataService) {}

  ngOnInit(): void {
    this.getReportHistory({ target: { value: 'today' } });
    this.prepareForDownload({ target: { value: 'referrals' } });

  }

  // datax = [
  //   { firstname: 'Ahmed', lastname: 'Tomi', email: 'ah@smthing.co.com' },
  //   { firstname: 'Raed', lastname: 'Labes', email: 'rl@smthing.co.com' },
  //   { firstname: 'Yezzi', lastname: 'Min l3b', email: 'ymin@cocococo.com' },
  //   ]

  getReportHistory(event: any) {
    this.spinner.show();
    this.data.getReportHistory(event.target.value).subscribe((res: any) => {
      this.reportHistory = res.UsersStatus;
      this.spinner.hide();
    });
  }

  prepareForDownload(event: any) {
    this.spinner.show();
    this.data.prepareForDownload(event.target.value).subscribe((res: any) => {
      this.autoCompleteOpts = res;
      this.spinner.hide();
    });
  }

  generateReport() {
    this.spinner.show();
    this.data.downloadReport(this.selectedReport)
      .subscribe((res: any) => {
        this.generatedReport  = res;
        this.spinner.hide();
      });
      this.spinner.hide();
  }


  setDataForDownload(data: any) {
    this.datax = data;
  }
}
