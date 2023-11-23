import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HistoryComponent } from 'src/app/components/history/history.component';
import { Turno } from 'src/app/entities/Appointment';
import { Schedule } from 'src/app/entities/Schedule';
import { Especialista } from 'src/app/entities/Specialist';
import { Especialidad } from 'src/app/entities/Speciality';
import { User } from 'src/app/entities/User';
import { AppointmentService } from 'src/app/services/appointment.service';
import { SpecialityService } from 'src/app/services/speciality.service';
import { UserService } from 'src/app/services/user.service';


const enterTransition = transition(':enter', [style({opacity: 0}), animate('1s ease-in', style({opacity:1}))]);
const exitTransition = transition(':leave', [style({opacity: 1}), animate('500ms ease-out', style({opacity:0}))]);
const fadeIn = trigger('fadeIn', [enterTransition]);
const fadeOut = trigger('fadeOut', [exitTransition]);

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
  animations: [fadeIn, fadeOut]
})
export class MyProfileComponent implements OnInit{

  @ViewChild(HistoryComponent)
  hijoComponent!: HistoryComponent;

  protected photoTwo: any;
  protected hiddenProfile: boolean;
  protected specialist: Especialista | undefined;
  protected schedule: Schedule = new Schedule();
  protected showSchedule: boolean;
  protected myAppointments: Turno[];
  protected listOfSpecialities: Especialidad[];
  protected selectedUser?: User;

  constructor(public uService: UserService, public aService: AppointmentService, public sService: SpecialityService){
    this.showSchedule = false;
    this.hiddenProfile = false;
    this.myAppointments = [];
    this.listOfSpecialities = [];
    this.setSpecialities();
    this.selectedUser = this.uService.userLogged;
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
    this.aService.getAppointments();
  }

  protected showFormSchedule() {
    this.showSchedule = true;
  }

  protected handlerUpdateScheduleView(showSchedule: boolean) {
    this.showSchedule = showSchedule;
  }

  protected getMedicalRecord(){
    this.hijoComponent.getMedicalRecord(this.selectedUser!);
    this.hiddenProfile = true;
  }
  
  protected return(){
    this.hiddenProfile = false;
  }

  private async setSpecialities(){
    this.listOfSpecialities = await this.sService.getAllSpecialities();
  }

}
