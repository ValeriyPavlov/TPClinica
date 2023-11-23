import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Turno } from 'src/app/entities/Appointment';
import { Diagnostico } from 'src/app/entities/MedicalRecord';
import { Especialidad } from 'src/app/entities/Speciality';
import { User } from 'src/app/entities/User';
import { AppointmentService } from 'src/app/services/appointment.service';
import { SpecialityService } from 'src/app/services/speciality.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnChanges{

  @Input() selectedUser?: User;
  @Output() showTable = new EventEmitter();

  protected myAppointments: Turno [];
  protected listOfSpecialities: Especialidad[];

  constructor(public aService: AppointmentService, public uService: UserService, public sService: SpecialityService){
    this.myAppointments = [];
    this.listOfSpecialities = [];
    this.setSpecialities();
    this.aService.getAppointments();
  }

  ngOnChanges(){
    this.getMedicalRecord(this.selectedUser!);
  }

  public getMedicalRecord(user: User){
    this.myAppointments = this.aService.appointments.filter((app) => app.patient.userId == user.userId && app.state == 'Realizado');
    this.myAppointments = this.myAppointments.sort((a, b) => {
      if(b.day.date !== a.day.date)
      {
        let aDate = new Date(parseInt(a.day.date!.substring(6)), parseInt(a.day.date!.substring(3, 5)), parseInt(a.day.date!.substring(0, 2)));
        let bDate = new Date(parseInt(b.day.date!.substring(6)), parseInt(b.day.date!.substring(3, 5)), parseInt(b.day.date!.substring(0, 2)));
        if(aDate > bDate){return 1;
        }else{return -1;}
      }else{
        if(parseFloat(a.day.timeStart) != parseFloat(b.day.timeStart)){
          if(parseFloat(a.day.timeStart) > parseFloat(b.day.timeStart)){return 1;}
          else{return -1;}
        }else{return 0;}}
    });
  }

  protected return(){
    this.showTable.emit(true);
  }

  private async setSpecialities(){
    this.listOfSpecialities = await this.sService.getAllSpecialities();
  }

  protected getSpecialityPhoto(speciality: string){
    let imagen: any;
    this.listOfSpecialities?.forEach(spec => {
      if(spec.description == speciality)
      {
        imagen = spec.image;
      }
    });
    return imagen;
  }

  protected getDiagnosis(item: any, index: number){
    let ref = document.getElementById("item-" + index);
    let diag = item.diagnosis as Diagnostico;
    let retorno = `Altura: ${diag.height} cm<br>Peso: ${diag.weight} kg<br>Temperatura: ${diag.temperature} C°<br>Presion: ${diag.pressure} mmHg`;
    diag.dynamicData?.forEach(e => {
      retorno = retorno + `<br>${e.key}: ${e.value}`;
    });
    if(ref){
      ref.innerHTML = retorno;
    }
  }

  protected downloadMedicalRecord(){
    this.uService.createPdf(this.myAppointments, this.uService.userLogged!);
  }

}
