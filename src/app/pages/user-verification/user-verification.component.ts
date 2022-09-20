import {NgxSpinnerService} from 'ngx-spinner';
import {AuthService} from './../../api/auth.service';
import {Component, OnInit} from '@angular/core';
import {NotifierService} from "angular-notifier";

@Component({
  selector: 'app-user-verification',
  templateUrl: './user-verification.component.html',
  styleUrls: ['./user-verification.component.scss'],
})
export class UserVerificationComponent implements OnInit {
  noData: Boolean = false;
  allUsers: any = [];
  multipleUsers: string[] = [];
  countries: any[] = [];
  showAllChecked: Boolean = false;
  isDisabled = false;
  page = 1;
  limit = 20;
  count = 0;
  is_verified = -1;
  userDetails = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    country: '',
    profession: '',
    regCouncil: '',
    reg_number: '',
    createdAt: '',
    device: '',
    city: '',
    is_active: false,
    activeStatus: '',
    _id: '',
    type: '',
  };

  constructor(
    private auth: AuthService,
    private spinner: NgxSpinnerService,
    private notifierService: NotifierService
  ) {
  }

  ngOnInit(): void {
    this.getUsersToVerify(this.page, this.limit);
    this.getCountriesList();
  }


  showIndividualUser(user: any) {
    console.log(user);
    this.userDetails = user;
  }

  pagify(next: boolean, is_verified: number): void {
    if (is_verified >= 0) {
      this.is_verified = is_verified;
    } else if (next) {
      if (this.page == 1) {
        return;
      }
      this.page--;
    } else {
      if (this.allUsers.length === 0) {
        return;
      }
      this.page++;
    }
    this.getUsersToVerify(this.page, this.limit);
  }

  getUsersToVerify(page: number, limit: number) {
    console.log('Getting users')
    this.spinner.show();
    this.auth.getUsersToVerify(page, limit, this.is_verified).subscribe((resp: any) => {
      console.log(resp.results)
      this.count = resp.total;
      resp.results.map((x: { checkbox: boolean }) => {
        x.checkbox = false;
        return x;
      });
      this.allUsers = resp.results;
      this.spinner.hide();
    });
  }

  getCountriesList() {
    this.auth.getCountries().subscribe((resp: any) => {
      this.countries = resp;
      console.log(this.countries);
    });
  }

  addToMultipleUsers(user: any) {
    if (this.multipleUsers.includes(user)) {
      this.multipleUsers.splice(this.multipleUsers.indexOf(user), 1)
    } else {
      this.multipleUsers.push(user);
    }
    console.log(this.multipleUsers)
  }

  getCountry(name: string) {
    return this.countries?.filter(el => el.name == name || el.code == name);
  }

  verifyUser() {
    var userObject = {
      ids: [''],
      is_verified: 2,
    };
    if (this.multipleUsers.length === 0) {
      userObject.ids.push(this.userDetails._id);
      userObject.ids = userObject.ids.filter(el => el.length > 0);
      this.spinner.show();
      this.auth.verifyUser(userObject).subscribe((response: any) => {
          response.message === 'Verified'
            ? this.notifierService.notify('success', 'User verified successfully')
            : this.notifierService.notify('error', 'Error Occurred Trying To verify')
          this.spinner.hide();
          this.getUsersToVerify(this.page, this.limit);
        },
        () => {
          this.notifierService.notify('error', 'Failed to verify user')
        });
    } else {
      userObject.ids = this.multipleUsers;
      this.spinner.show();
      this.auth.verifyUser(userObject).subscribe((response: any) => {
          this.multipleUsers.length = 0;
          response.message === 'Verified'
            ? this.notifierService.notify('success', 'User(s) verified successfully')
            : this.notifierService.notify('error', 'Failed to verify users')
          this.spinner.hide();
          this.getUsersToVerify(this.page, this.limit);
        },
        () => {
          this.notifierService.notify('error', 'Failed to verify users')
        });
    }
  }

  declineUser() {
    var userObject = {
      ids: [''],
      is_verified: 3,
    };
    if (this.multipleUsers.length === 0) {
      userObject.ids.push(this.userDetails._id);
      userObject.ids = userObject.ids.filter(el => el.length);
      this.spinner.show();
      this.auth.verifyUser(userObject).subscribe((response: any) => {
          response.message === 'Verified'
            ? this.notifierService.notify('success', 'User(s) verification declined successfully')
            : this.notifierService.notify('error', 'Failed to decline users')
          this.spinner.hide();
          this.getUsersToVerify(this.page, this.limit);
        },
        () => {
          this.notifierService.notify('error', 'Failed to decline users')
        });
    } else {
      userObject.ids = this.multipleUsers;
      userObject.ids = userObject.ids.filter(el => el.length);
      this.spinner.show();
      this.auth.verifyUser(userObject).subscribe((response: any) => {
          this.multipleUsers.length = 0;
          response.message === 'Verified'
            ? this.notifierService.notify('success', 'User(s) verified successfully')
            : this.notifierService.notify('error', 'Failed to decline users')
          this.spinner.hide();
          this.getUsersToVerify(this.page, this.limit);
        },
        () => {
          this.notifierService.notify('error', 'Failed to decline users')
        });
    }
  }

  selectAllUsers() {
    console.log(this.multipleUsers)
    if (this.multipleUsers.length) {
      this.multipleUsers = []
    } else {
      this.multipleUsers = [...this.allUsers.map((el: any) => el._id)];
    }
  }

  approveAllUsers() {
    this.spinner.show();
    this.auth.approveAllUsers().subscribe((response: any) => {
      response.message === 'Verified'
        ? this.notifierService.notify('success', 'Users have been verified')
        : this.notifierService.notify('error', 'Failed to verify users')
      this.spinner.hide();
      this.getUsersToVerify(this.page, this.limit);
    }, () => {
      this.notifierService.notify('error', 'Failed to verify users')
    });
  }

  declineAllUsers() {
    this.spinner.show();
    this.auth.declineAllUsers().subscribe((response: any) => {
      response.message === 'Declined '
        ? this.notifierService.notify('success', 'Users have been declined')
        : this.notifierService.notify('error', 'Failed to decline users')
      this.spinner.hide();
      this.getUsersToVerify(this.page, this.limit);
    }, () => {
      this.notifierService.notify('error', 'Failed to decline users')
    });
  }

  getPageNumber() {
    return Math.ceil((this.count)/this.limit);
  }
}
