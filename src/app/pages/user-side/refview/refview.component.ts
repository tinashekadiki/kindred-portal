import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../api/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-refview',
  templateUrl: './refview.component.html',
  styleUrls: ['./refview.component.scss']
})
export class RefviewComponent implements OnInit {
  generatedJSON: any = [];
  formId='';
  formName='';
  showForm: Boolean = false;

  constructor(
    private data: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.formId = params.id;
      this.getSingleRefForm();
    });
  }
  
  getSingleRefForm(){
    this.spinner.show();
    this.data.getSingleRefForm(this.formId).subscribe(
      (data:any) => {
      console.log(data)

        this.generatedJSON = data[0].template;
        this.formName = data[0].facility;
        this.showForm = true;
        this.spinner.hide();
      },
      error => {
        console.log(error);
        alert('Error Trying To Retrieve Form')
        this.spinner.hide();
      }
    );
  }


}
