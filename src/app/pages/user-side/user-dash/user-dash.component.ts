import { DataService } from './../../../api/data.service';
import { Component, OnInit } from '@angular/core';
import { multi } from './data';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-user-dash',
  templateUrl: './user-dash.component.html',
  styleUrls: ['./user-dash.component.scss']
})
export class UserDashComponent implements OnInit {

  multi = [];
  view= [700, 400];

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

  colorScheme = {
    domain: ['#4D979E','#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  newDataTable: any = [];
  dataPoints: any = [];
  showLineGraph: Boolean = false;
  NumberOfTeams = 0;
  ReadmissionsRate = 0;
  BedsOccupancry = 0;
  ReferralResponse = 0;
  DailyServices = 0;
  diseases: any = [];

  constructor(private data: DataService,private spinner: NgxSpinnerService) {
    Object.assign(this, { multi });

  }

  onSelect(data:any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data:any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  ngOnInit() {
    this.reloadHelper();
    this.getAllPatientDiseases()
    this.getUserDashboardReport({ target: { value: 'last_60_days' } }, "Covid 19");
  }


  reloadHelper() {
    if (!localStorage.getItem('bar')) {
      localStorage.setItem('bar', 'no reload');
      location.reload();
    } else {
      localStorage.removeItem('bar');
    }
  }


  getUserDashboardReport($event: any, problem: any) {
    this.newDataTable.length = 0;
    this.dataPoints.length = 0;
    this.showLineGraph = false;
    this.spinner.show();
    this.data
      .getUserDashboardReport({
        timeLimit: $event.target.value,
        problem: problem,
      })
      .subscribe((res: any) => {
        res.results.forEach((element: any) => {
          this.newDataTable.push({
            name: element[0],
            value: element[1],
          });
        });
        this.dataPoints.push({
          name: 'Patients Seen',
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

  getAllPatientDiseases() {
    this.diseases.length = 0;
    this.spinner.show();
    this.data
      .getAllPatientDiseases()
      .subscribe((res: any) => {
       this.diseases = res;
        this.spinner.hide();
      });
  }


}
