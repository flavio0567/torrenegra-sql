import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/user.service';
import { User } from '../../user/user';

@Component({
  selector: 'app-appt-dashboard',
  templateUrl: './appt-dashboard.component.html',
  styleUrls: ['./appt-dashboard.component.css']
})
export class ApptDashboardComponent implements OnInit {

  user: any;

  constructor(private _userService: UserService) { }

  ngOnInit() {
    console.log('ApptDashboardComponent > ngOnInit() ');
    this.user = User;
    this.user = this._userService.getUserLoggedIn();
  }

}