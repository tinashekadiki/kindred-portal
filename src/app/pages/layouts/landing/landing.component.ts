import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from './../../../api/auth.service';
import { ElementRef } from '@angular/core';
import { Component, OnInit, AfterViewInit, OnDestroy , AfterViewChecked} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements AfterViewChecked, OnInit, OnDestroy {
  email: string = '';
  password: string = '';
  errorLogin: Boolean = false;

  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private auth: AuthService,
    private spinner: NgxSpinnerService
  ) {}

  ngAfterViewChecked() {
    this.elementRef.nativeElement.ownerDocument.body.style.background =
      'url(../../../../assets/backgrounds/landing.svg)';
  }

  ngOnDestroy(): void {}

  ngOnInit() {}

  login() {
    if(!(this.email.includes('@') && this.password.length > 5)){
      this.errorLogin = true;
      return;
    }
    this.errorLogin = false;
    this.spinner.show();
    this.auth.login(this.email, this.password).subscribe(async (resp: any) => {
      console.log(resp);
      if (resp.status !== 'success') {
        this.errorLogin = true;
        await this.spinner.hide();
      } else {
        localStorage.setItem(this.auth.lKey,resp['message'].role)
        localStorage.setItem(this.auth.accessToken, resp['message'].jwt);
        localStorage.setItem('myname',`${resp['message'].firstName} ${resp['message'].lastName}`)
        localStorage.setItem('email',resp['message'].email)
        console.log(resp)
        if(resp['message'].role === 'admin'){
          this.router.navigate(['/dashboard']);
        } else{
          this.router.navigate(['/me/dash']);
        }
        this.spinner.hide();
        // this.router.navigate(['/dashboard']);
        console.log(resp)
      }
    }, (err: any) => {
      this.errorLogin = true;
      console.log(err);
      }

    );
  }


}
