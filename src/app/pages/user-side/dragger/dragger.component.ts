import { NgxSpinnerService } from 'ngx-spinner';
import { DataService } from './../../../api/data.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dragger',
  templateUrl: './dragger.component.html',
  styleUrls: ['./dragger.component.scss'],
})
export class DraggerComponent implements OnInit {
  generatedJSON: any = [];
  formId='';
  formName=''

  form: any = {
    components: [],
  };


  constructor(
    private data: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.formId = params.id;
      this.formName = params.name;
      this.getForm();
    });
  
}

  printJson() {
    this.generatedJSON.length = 0;
    this.generatedJSON = JSON.parse(JSON.stringify(this.form.components));
  }

  getForm() {
  }

  saveForm() {
    this.spinner.show();
    this.data.updateReferralForm({template:this.form.components},this.formId).subscribe((res) => {
      this.spinner.hide()
      alert('Form Saved Successfully');
    },
    (err) => {
      this.spinner.hide();
      alert('Error Saving Form');
    }
    );
  }
}
