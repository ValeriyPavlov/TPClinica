import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Turno } from 'src/app/entities/Appointment';
import { Diagnostico } from 'src/app/entities/MedicalRecord';
import { Especialidad } from 'src/app/entities/Speciality';
import { User } from 'src/app/entities/User';
import { AlertService } from 'src/app/services/alert.service';
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
  protected listOfSpecialists: string[];
  protected selectedSpecialistId: any;
  protected filteredAppointments: Turno[];
  protected listOfUniqueSpecialist: User[];

  constructor(public aService: AppointmentService, public uService: UserService, public sService: SpecialityService, public alertService: AlertService){
    this.myAppointments = [];
    this.listOfSpecialities = [];
    this.filteredAppointments = [];
    this.listOfUniqueSpecialist = [];
    this.listOfSpecialists = [];
    this.selectedSpecialistId = "";
    this.setSpecialities();
    this.aService.getAppointments();
  }

  ngOnChanges(){
    this.getMedicalRecord(this.selectedUser!);
  }

  public getMedicalRecord(user: User){
    if(user != undefined){
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

    this.listOfSpecialists = [];
    this.listOfUniqueSpecialist = [];
    this.myAppointments.forEach(app => {
      if(!this.listOfSpecialists.includes(app.specialist.userId)){
        this.listOfSpecialists.push(app.specialist.userId);
        this.listOfUniqueSpecialist.push(app.specialist as User);
      }
    });

    const select = document.getElementById('specialist') as HTMLSelectElement;
    if(select != null){
      select.addEventListener('change', (event) => {
        this.selectedSpecialistId = (event.target as HTMLSelectElement).value;
      });
    }
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

  protected getDiagnosis(item: Turno){
    let diag = item.diagnosis as Diagnostico;
    let retorno: string[] = [];
    retorno.push(`Altura: ${diag.height} cm`);
    retorno.push(`Peso: ${diag.weight} kg`);
    retorno.push(`Temperatura: ${diag.temperature} C°`);
    retorno.push(`Presion: ${diag.pressure} mmHg`);
    
    diag.dynamicData?.forEach(e => {
      retorno.push(`${e.key}: ${e.value}`);
    });
    return retorno;
  }

  protected downloadMedicalRecord(){
    if(this.selectedSpecialistId != ""){
      if(this.selectedSpecialistId == "all"){
        this.uService.createPdf(this.myAppointments, this.uService.userLogged!);
      }
      else{
        this.filteredAppointments = this.myAppointments.filter(app => app.specialist.userId == this.selectedSpecialistId) as Turno[];
        this.uService.createPdf(this.filteredAppointments, this.uService.userLogged!);
      }
    }
    else{
      this.alertService.showAlert({icon: 'error', message: 'Debe seleccionar una opcion para descargar', timer: 2000});
    }
  }
}
