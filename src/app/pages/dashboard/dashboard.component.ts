import { NgxSpinnerService } from 'ngx-spinner';
import { DataService } from './../../api/data.service';
import { Component, OnInit } from '@angular/core';
import { multi } from './data';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  multi = [];
  view = [700, 400];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;
  reportHistory: any;

  colorScheme = {
    domain: [
      '#4D979E',
      '#5AA454',
      '#E44D25',
      '#CFC0BB',
      '#7aa3e5',
      '#a8385d',
      '#aae3f5',
    ],
  };

  dashSummary = {
    dailyActiveUsers: 0,
    supportRequest: 0,
    activeTeams: 0,
    newUsers: 0,
  };

  newDataTable: any = [];
  dataPoints: any = [];
  showLineGraph: Boolean = false;
  NumberOfTeams = 0;
  ReadmissionsRate = 0;
  BedsOccupancry = 0;
  ReferralResponse = 0;
  DailyServices = 0;

  constructor(private data: DataService, private spinner: NgxSpinnerService) {
    Object.assign(this, { multi });
  }

  getgetDashboardSummary($event: any) {
    this.spinner.show();
    this.data.getDashboardSummary($event.target.value).subscribe((res: any) => {
      this.dashSummary = res;
      this.spinner.hide();
    });
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  ngOnInit() {
    this.reloadHelper();

    this.getgetDashboardSummary({ target: { value: 'today' } });
    this.getAdminDashboardReport({ target: { value: 'last_60_days' } }, 2);
  }

  reloadHelper() {
    if (!localStorage.getItem('foo')) {
      localStorage.setItem('foo', 'no reload');
      location.reload();
    } else {
      localStorage.removeItem('foo');
    }
  }

  getAdminDashboardReport($event: any, verified: any) {
    this.newDataTable.length = 0;
    this.dataPoints.length = 0;
    this.showLineGraph = false;
    this.spinner.show();
    this.data
      .getAdminDashboardReport({
        timeLimit: $event.target.value,
        is_verified: verified,
      })
      .subscribe((res: any) => {
        res.results.forEach((element: any) => {
          this.newDataTable.push({
            name: element[0],
            value: element[1],
          });
        });
        this.dataPoints.push({
          name: 'New Users',
          series: this.newDataTable,
        });
        this.NumberOfTeams = res.NumberOfTeams;
        this.ReadmissionsRate = res.ReadmissionsRate;
        this.BedsOccupancry = res.BedsOccupancry;
        this.ReferralResponse = res.ReferralResponse;
        this.DailyServices = res.DailyServices;
        this.showLineGraph = true;
        this.spinner.hide();
      });
  }
}
