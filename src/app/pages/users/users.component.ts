import {DataService} from './../../api/data.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {AuthService} from './../../api/auth.service';
import {Component, OnInit} from '@angular/core';
import {NotifierService} from "angular-notifier";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  noData: Boolean = false;
  page = 1;
  limit = 20;
  count = 0;
  allUsers: any[] = [];
  countries: any[] = [];

  userDetails = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    country: '',
    profession: '',
    council: '',
    reg_number: '',
    createdAt: '',
    device: '',
    city: '',
    is_active: false,
    activeStatus: '',
    speciality: '',
    sub_speciality: '',
    _id: '',
    is_verified: '',
    team: [],
    facility: '',
    occupation: '',
    expdate: '',
    photoUrl: '',
    type: '',
  };

  constructor(private auth: AuthService, private spinner: NgxSpinnerService, private data: DataService, private notifierService: NotifierService,) {
  }

  pagify(next: boolean): void {
    if (next) {
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
    this.getAllUsers();
  }

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllCountries();
    this.getCountriesList();
  }

  getCountriesList() {
    this.auth.getCountries().subscribe((resp: any) => {
      this.countries = resp;
      console.log(this.countries);
    });
  }

  getCountry(name: string) {
    console.log(name)
    return this.countries?.filter(el => el.code == 'ZA');
  }

  showIndividualUser(user: any) {
    this.userDetails = user;
    this.noData = true;
  }

  getAllUsers() {
    this.spinner.show();
    this.auth.getUsersToVerify(this.page, this.limit).subscribe((data: any) => {
      this.allUsers = data.results;
      this.count = data.total;
      this.noData = false;
      this.spinner.hide();
    });
  }

  updateUser() {
    this.spinner.show();
    this.auth.updateUser(this.userDetails, this.userDetails._id).subscribe(
      (data: any) => {
        this.getAllUsers();
        this.notifierService.notify('success', 'User details updated successfully')
        this.spinner.hide();
      },
      (error: any) => {
        this.notifierService.notify('error', 'Failed to update user details')
        console.log(error);
        this.spinner.hide();
      }
    );
  }

  deleteUser() {
    this.spinner.show();
    this.auth.deleteUser(this.userDetails._id).subscribe(
      (data: any) => {
        this.getAllUsers();
        this.notifierService.notify('success', 'User details deleted successfully')
        this.spinner.hide();
      },
      (error: any) => {
        console.log(error);
        this.notifierService.notify('error', 'Failed to deleted user details')
        alert('Unexpected Error When Deleting');
        this.spinner.hide();
      }
    );
  }

  getAllCountries() {
    this.spinner.show();
    this.data.getAllCountries().subscribe((resp: any) => {
      this.countries = resp;
      this.spinner.hide();
    });
  }
}
