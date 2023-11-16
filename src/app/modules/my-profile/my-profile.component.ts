import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent {

  protected showSchedule: boolean;
  constructor(public uService: UserService){
    this.showSchedule = false;
  }

  protected showFormSchedule() {
    this.showSchedule = true;
  }

  protected handlerUpdateScheduleView(showSchedule: boolean) {
    this.showSchedule = showSchedule;
  }
}
