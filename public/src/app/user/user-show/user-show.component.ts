import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-show',
  templateUrl: './user-show.component.html',
  styleUrls: ['./user-show.component.css']
})
export class UserShowComponent implements OnInit {
  userLogged = {
    email: '',
    admin: ''
  }
  user: any;
  frontPath:string = "../../assets/images/check.png";
  backPath:string =  "";

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log('UserShowComponent > ngOnInit()');
    this.userLogged = this._userService.getUserLoggedIn();
    this.getUser(this._route.snapshot.params['id']);
  }

  isChecked(): boolean {
    return this.user.admin;
  }

  isFalse(): boolean {
    return false;
  }

  getUser(id){
    console.log('UserShowComponent > getUser'); 
    this._userService.getUserByPk(id)
      .subscribe((res) => {
      this.user = res.json();
    });
  }

  changeSituation(event){
    console.log('UserShowComponent > changeSituation'); 
    this.user.ativo = event;
    this._userService.changeSituation(this.user)
      .subscribe((res) => {
      this.user = res.json();
      this._router.navigate(['/users']);
    });
  }

  cancel() {
    this._router.navigate(['/users']);
  }

}