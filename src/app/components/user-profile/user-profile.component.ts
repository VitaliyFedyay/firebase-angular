import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  edit: boolean;

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

  setEdit() {
    this.edit = true;
  }

  saveChanges(user) {
    this.edit = false;
    this.auth.updateUserData(user);
  }

}
