import { NgxSpinnerService } from 'ngx-spinner';
import { DataService } from './../../../api/data.service';
import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.scss'],
})
export class RosterComponent implements OnInit {


  frequency: number = 1;
  allRosterUsers: any = [];
  allShiftUsers: any = [];

  focusUsers: any = [];
  allRoster: any;
  allTempRoster: any;
  allPeopleOnCall: any = [];
  peopleOnCallOnly: any = [];
  allTeams: any = [];
  currentOnCall: any = [];

  expCall: any;
  ogOnCall: any;

  csvData: any = [];

  csvOptions = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'Hospital Roster',
    useBom: true,
    noDownload: false,
    headers: [
      'Date',
      'Interns',
      'MO',
      'Polycover',
      'REG1',
      'REG2',
      'REG3',
      'Consultant',
    ],
    keys: [
      'Date',
      'Interns',
      'MO',
      'Polycover',
      'REG1',
      'REG2',
      'REG3',
      'Consultant',
    ],
    removeNewLines: false,
    filename: 'roster',
  };

  currentRankSelection: any = 'interns';
  currentSelectedGroup: any = [];
  originalSelectedGroup: any = [];

  term: any;
  emailTerm: any;

  rosterDetails: any;
  currentDate: any;

  rosterRequest = {
    rosterFor: '611a81cb9bff373100d35a0a',
    rosterType: 1,
    month: '09',
    year: '2021',
  };

  isCallDuty: Boolean = true;
  constructor(private data: DataService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.getRoster();
    this.getAlRosterUsers();
    this.getAlShiftRosterUsers();
  }

  flatten(data: any) {
    return data.reduce(function (acc: any, val: any) {
      return acc.concat(val.name);
    }, []);
  }

  async prepareForCsv(data: any, rType: any) {

    if(rType == 1) {
      data.forEach((element: any) => {
        this.csvData.push({
          Date: element.date,
          Interns: element.data.interns.join(', '),
          MO: element.data.medicalOfficer.join(', '),
          Polycover: element.data.consultant2.join(', '),
          REG1: element.data.registrar1.join(', '),
          REG2: element.data.registrar2.join(', '),
          REG3: element.data.registrar3.join(', '),
          Consultant: element.data.consultant.join(', '),
        });
      });
    }else {
      data.forEach((element: any) => {
        this.csvData.push({
          Date: element.date,
          morning: element.data.morning.join(', '),
          afternoon: element.data.afternoon.join(', '),
          night: element.data.night.join(', '),
          off: element.data.off.join(', '),
        });
      });
    }
    
  }

  addExtraColumn() {
    this.frequency++;
  }

  changeMonthAndDate() {
    console.log(this.rosterRequest.month);
  }

  getRosterUsersToAdd(date: any, keys: any): void {
    $('#exampleModal').modal('show');
    if(this.rosterRequest.rosterType == 1) {
    
    this.allRosterUsers.length = 0;
    this.getAlRosterUsers();
    this.currentDate = date;
    this.currentRankSelection = keys;
    var temp = JSON.parse(JSON.stringify(this.allRoster));
    temp.forEach((element: any) => {
      if (element.date === date) {
        this.currentOnCall = JSON.parse(JSON.stringify(element.data));
      }
    });
    this.currentOnCall = JSON.parse(JSON.stringify(this.currentOnCall[keys]));
    this.allRosterUsers = JSON.parse(
      JSON.stringify(Object.values(this.allRosterUsers[keys]))
    );
    this.allRosterUsers.forEach((element: any) => {
      this.currentOnCall.forEach((e: any) => {
        if (element.email === e.email) {
          element.phone = e.phoneNumber;
          element.name = e.name;
          element.email = e.email;
          element.onDuty = e.onDuty;
        }
      });
    });
    this.currentSelectedGroup.length = 0;
    this.originalSelectedGroup.length = 0;
    this.currentSelectedGroup = JSON.parse(JSON.stringify(this.allRosterUsers));
    this.originalSelectedGroup = JSON.parse(
      JSON.stringify(this.allRosterUsers)
    );
    }else {

      // this.allShiftUsers.length = 0;
      // this.getAlShiftRosterUsers();
      this.currentDate = date;
      this.currentRankSelection = keys;
      var temp = JSON.parse(JSON.stringify(this.allRoster));
      temp.forEach((element: any) => {
        if (element.date === date) {
          this.currentOnCall = JSON.parse(JSON.stringify(element.data));
        }
      });
      this.currentOnCall = JSON.parse(JSON.stringify(this.currentOnCall[this.currentRankSelection]));
      this.allShiftUsers.forEach((element: any) => {
        this.currentOnCall.forEach((e: any) => {
          if (element.email === e.email) {
            console.log(true)
            element.phone = e.phoneNumber;
            element.name = e.name;
            element.email = e.email;
            element.onDuty = e.onDuty;
          }
        });
      });
      console.log('shift users' , this.allShiftUsers);

      this.currentSelectedGroup.length = 0;
      this.originalSelectedGroup.length = 0;
      this.currentSelectedGroup = JSON.parse(JSON.stringify(this.allShiftUsers));
      this.originalSelectedGroup = JSON.parse(
        JSON.stringify(this.allShiftUsers)
      );
    }
  }



  getAlRosterUsers(): void {
    this.allRosterUsers.length = 0;
    this.spinner.show();
    this.data.getAlRosterUsers().subscribe(
      (res: any) => {
        this.allRosterUsers = res;
        this.spinner.hide();
      },
      (err: any) => {
        alert('error');
        this.spinner.hide();
      }
    );
  }

  getAlShiftRosterUsers(): void {
    this.allShiftUsers.length = 0;
    this.spinner.show();
    this.data.getAlShiftRosterUsers().subscribe(
      (res: any) => {
        this.allShiftUsers = res;
        this.spinner.hide();
      },
      (err: any) => {
        alert('error');
        this.spinner.hide();
      }
    );
  }

  getRoster() {
    this.rosterRequest.rosterType == 2
      ? (this.isCallDuty = false)
      : (this.isCallDuty = true);
    this.spinner.show();
    this.data.getRosterByType(this.rosterRequest).subscribe(
      (res: any) => {
        this.allRoster = JSON.parse(JSON.stringify(res));
        this.allTempRoster = JSON.parse(JSON.stringify(res));
        this.expCall = JSON.parse(JSON.stringify(res));
        this.expCall.forEach((element: any) => {
          for (const [key, val] of Object.entries(element.data)) {
            element.data[key] = this.flatten(element.data[key]);
          }
        });
        this.ogOnCall = JSON.parse(JSON.stringify(this.expCall));
        this.prepareForCsv(JSON.parse(JSON.stringify(this.expCall)),this.rosterRequest.rosterType);
        this.expCall.forEach((e: any) => {
          for (const [key, val] of Object.entries(e.data)) {
            this.allPeopleOnCall.push(val);
          }
        });
        this.allPeopleOnCall = this.allPeopleOnCall.flat();
        this.allPeopleOnCall = this.allPeopleOnCall.filter(
          (item: any, pos: any, self: any) => self.indexOf(item) === pos
        );
        this.getAllTeamsByID();
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
        console.log(err);
      }
    );
  }

  getAllTeamsByID() {
    this.spinner.show();
    this.data.getAllTeamsByID('6103df5632ce6e23ec99e391').subscribe(
      (res: any) => {
        this.allTeams = res;
        this.spinner.hide();
      },
      (err: any) => {
        alert('error');
        this.spinner.hide();
      }
    );
  }

  copyRoleItems(initial: any, $event: any) {
    if (initial === $event.target.value) {
      this.expCall = JSON.parse(JSON.stringify(this.ogOnCall));
    } else {
      this.expCall = JSON.parse(JSON.stringify(this.ogOnCall));
      this.expCall.forEach((element: any) => {
        element.data[initial] = element.data[$event.target.value];
      });
    }
  }

  focusSelection(date: any, key: String) {
    this.currentDate = date;
    this.currentRankSelection = key;
    $('#exampleModal').modal('show');
    const tempRos = JSON.parse(JSON.stringify(this.allRoster));
    tempRos.forEach((element: any) => {
      if (element.date === date) {
        this.currentOnCall = JSON.parse(JSON.stringify(element.data));
      }
    });
    this.focusSelectedGroup(key);
  }

  focusSelectedGroup2(key: any) {
    this.currentSelectedGroup.length = 0;
    this.originalSelectedGroup.length = 0;
    this.currentSelectedGroup = JSON.parse(
      JSON.stringify(this.currentOnCall[key])
    );
    this.originalSelectedGroup = JSON.parse(
      JSON.stringify(this.currentOnCall[key])
    );
  }

  focusSelectedGroup(key: any) {
    this.currentSelectedGroup.length = 0;
    this.originalSelectedGroup.length = 0;
    this.currentSelectedGroup = JSON.parse(
      JSON.stringify(this.currentOnCall[key])
    );
    this.originalSelectedGroup = JSON.parse(
      JSON.stringify(this.currentOnCall[key])
    );
  }

  focusSelectedGroupOption(key: any) {
    this.currentRankSelection = key.value;
    this.currentSelectedGroup.length = 0;
    this.originalSelectedGroup.length = 0;
    this.currentSelectedGroup = JSON.parse(
      JSON.stringify(this.currentOnCall[key.value])
    );
    this.originalSelectedGroup = JSON.parse(
      JSON.stringify(this.currentOnCall[key.value])
    );
  }

  searchByName() {
    this.currentSelectedGroup = JSON.parse(
      JSON.stringify(this.originalSelectedGroup)
    );
    this.currentSelectedGroup = this.currentSelectedGroup.filter((item: any) =>
      item.name.toLowerCase().includes(this.term.toLowerCase())
    );
  }

  searchByEmail() {
    this.currentSelectedGroup = JSON.parse(
      JSON.stringify(this.originalSelectedGroup)
    );
    this.currentSelectedGroup = this.currentSelectedGroup.filter((item: any) =>
      item.email.toLowerCase().includes(this.emailTerm.toLowerCase())
    );
  }

  addOrRemoveFromSelectedGroup(obj: any, evt: any) {
    let action = evt.target.checked;
    this.currentSelectedGroup.forEach((element: any, index: any) => {
      if (element.name === obj.name) {
        this.currentSelectedGroup[index].onDuty = action;
      }
    });
  }

  addToRoster() {
    this.rosterDetails = {
      rosterFor: '611a81cb9bff373100d35a0a',
      ranks: this.currentRankSelection,
      date: this.currentDate,
      data: this.currentSelectedGroup,
    };
    this.rosterDetails.data.forEach((element: any) => {
      if (!element.onDuty) {
        this.rosterDetails.data = this.rosterDetails.data.filter(
          (item: any) => item.name !== element.name
        );
      }
    });

    this.spinner.show();
    console.log('rostetr details', this.rosterDetails);
    this.data.addToRoster(this.rosterDetails).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.getRoster();
        $('#exampleModal').modal('hide');
      },
      (err: any) => {
        this.spinner.hide();
        alert('Error , Try Again');
      }
    );
  }


 
}
