import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-appt-dashboard',
  templateUrl: './appt-dashboard.component.html',
  styleUrls: ['./appt-dashboard.component.css']
})
export class ApptDashboardComponent implements OnInit {

  userLogged = {
    name: '',
    email: '',
    // admin: ''
  }

  constructor(private _userService: UserService) { }

  ngOnInit() {
    console.log('ApptDashboardComponent > ngOnInit() ');
    this.userLogged = this._userService.getUserLoggedIn();
  }

}