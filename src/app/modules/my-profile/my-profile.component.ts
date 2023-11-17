import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/entities/Patient';
import { Schedule } from 'src/app/entities/Schedule';
import { Especialista } from 'src/app/entities/Specialist';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit{

  protected photoTwo: any;
  protected specialist: Especialista | undefined;
  protected schedule: Schedule = new Schedule();
  protected showSchedule: boolean;
  constructor(public uService: UserService){
    this.showSchedule = false;
  }
  ngOnInit(): void {
    this.uService.getPatientPhotoTwo();
    if(this.uService.userLogged?.userRole == 'especialista')
    {
      this.specialist = this.uService.userLogged as Especialista;
      if(this.specialist.speciality.schedule != undefined)
      {
        this.schedule = this.specialist.speciality.schedule;
      }
    }
  }

  protected showFormSchedule() {
    this.showSchedule = true;
  }

  protected handlerUpdateScheduleView(showSchedule: boolean) {
    this.showSchedule = showSchedule;
  }



}
