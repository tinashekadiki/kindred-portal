import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'kportal';

  constructor(private router: Router) {
    console.log(this.getCurrentRoute());
  }



   getCurrentRoute(): string {
    return this.router.url;
  }
}
