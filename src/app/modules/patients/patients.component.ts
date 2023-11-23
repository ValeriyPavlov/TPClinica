import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Turno } from 'src/app/entities/Appointment';
import { Paciente } from 'src/app/entities/Patient';
import { User, UserRole } from 'src/app/entities/User';
import { AlertService } from 'src/app/services/alert.service';
import { AppointmentService } from 'src/app/services/appointment.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit{

  public list?: Paciente[];
  protected ref: any;
  @Input() public roleOption?: UserRole;
  @Output() public eventSendUser: EventEmitter<User>;
  @Output() public eventShowTable: EventEmitter<boolean>;
  @Input() public showTable: boolean;
  protected selectedUser?: User;
  protected hideMedicalRecord: boolean;
  protected myAppointments: Turno[];
  protected listOfAppointments: Turno [];

  constructor(protected readonly userService: UserService, private readonly alertService: AlertService, public sService: NgxSpinnerService, public aService: AppointmentService) {
    this.eventSendUser = new EventEmitter();
    this.eventShowTable = new EventEmitter();
    this.showTable = true;
    this.hideMedicalRecord = true;
    this.myAppointments = [];
    this.list = [];
    this.listOfAppointments = [];
  }

  ngOnInit(): void{
    this.getAllAppointments();
  this.ref = this.aService.getAllAppointments().subscribe(
    (data: any) => {
      this.listOfAppointments = data;
      this.myAppointments = this.aService.appointments.filter(app => app.specialist.userId == this.userService.userLogged?.userId && app.state == "Realizado") as Turno[];
      let idsVistos: { [id: string]: boolean } = {};
      this.myAppointments = this.myAppointments.filter((a) => {
        if(!idsVistos[a.patient.userId])
        {
          idsVistos[a.patient.userId] = true;
          return true;
        }
        return false;
      });
      this.myAppointments.map((a) =>{
        this.list?.push(a.patient as Paciente);
      });
      this.unsub();
    },
    (error) => {
      console.error('Error al obtener datos:', error);
    });
  }

  unsub(): void {
    this.ref.unsubscribe();
  }

  protected async getAllAppointments(){
    await this.aService.getAppointments()
  }


  protected return() {
    this.showTable = !this.showTable;
  }

  protected selectUser(user: User){
    this.selectedUser = user;
    this.showTable = !this.showTable;
  }
}
