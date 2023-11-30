import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Turno } from 'src/app/entities/Appointment';
import { User, UserRole } from 'src/app/entities/User';
import { AlertService } from 'src/app/services/alert.service';
import { AppointmentService } from 'src/app/services/appointment.service';
import { UserService } from 'src/app/services/user.service';


const slide = trigger('slideInDown', [
  transition(':enter', [
    style({ transform: 'translateY(-100%)' }),
    animate('750ms ease-out', style({ transform: 'translateY(0)' })),
  ]),
  transition(":leave", [
    animate('500ms ease-out', style({ transform: 'translateY(-100%)' })),
  ])
])


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  animations: [slide]
})
export class UsersComponent {

  public listUsers?: User[];
  protected listFiltered?: User[];
  protected userOption?: UserRole;
  protected selectedUser?: User;
  protected showCreateUsers?: boolean;
  protected showTable: boolean;
  protected hiddenUsers: boolean;
  protected listChoseOption?: UserRole;
  protected hiddenHistory: boolean;
  protected hiddenMain: boolean;
  protected selectedUserAppointments: Turno[];

  constructor(protected readonly userService: UserService, public aService: AppointmentService, public alertService: AlertService) {
    this.userService.getUsers();
    this.setListOfUsers();
    this.listUsers = this.userService.users;
    this.showTable = true;
    this.hiddenMain = false;
    this.hiddenHistory = true;
    this.hiddenUsers = true;
    this.selectedUserAppointments = [];
    this.aService.getAppointments();
  }

  protected async chooseListOption(option: UserRole) {
    this.userOption = option;
    this.listFiltered = this.userService.users?.filter((u) => u.userRole === option);
    this.showTable = !this.showTable;
    this.listChoseOption = option;
  }

  protected async setListOfUsers() {
    await this.userService.getUsers();
  }

  protected activateCreateUsers() {
    this.showCreateUsers = true;
  }

  protected return() {
    this.showCreateUsers = false;
  }

  protected handlerUpdateView(showTable: boolean) {
    this.showTable = showTable;
  }

  protected handleSelectUser(dato:any){
    this.selectedUser = dato;
    this.hiddenHistory = false;
  }

  protected returnFromHistory(){
    this.hiddenHistory = true;
    this.hiddenMain = false;
  }

  protected downloadUsersAsExcel(){
    this.userService.exportUsersToXls(this.userService.users, "usuarios");
  }

  protected dowloadOneAsExcel(user: User){
    this.selectedUser = user;
    if(this.selectedUser != undefined){
      if(this.selectedUser.userRole == 'paciente'){
        this.selectedUserAppointments = this.aService.appointments.filter(app => app.patient.userId == this.selectedUser?.userId) as Turno[];
      }
      else
      {
        if(this.selectedUser.userRole == 'especialista'){
          this.selectedUserAppointments = this.aService.appointments.filter(app => app.specialist.userId == this.selectedUser?.userId) as Turno[];
        }
      }
      if(this.selectedUserAppointments.length > 0){
        this.userService.exportUserToXls(this.selectedUserAppointments, this.selectedUser, `turnos_de_${this.selectedUser?.lastName}_${this.selectedUser.name}`);
      }
      else{
        this.alertService.showAlert({icon: 'error', message: 'El usuario seleccionado NO tiene turnos para descargar.', timer: 2000});
      }
    }
    this.selectedUser = undefined;
  }

  protected selectUserToDownload(){
    this.hiddenMain = true;
    this.hiddenUsers = false;
    this.hiddenHistory = true;
  }

  protected returnToMain(){
    this.hiddenUsers = true;
    this.hiddenHistory = true;
    this.hiddenMain = false;
  }

}
