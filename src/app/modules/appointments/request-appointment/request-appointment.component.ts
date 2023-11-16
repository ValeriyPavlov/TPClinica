import { Component } from '@angular/core';
import { Turno } from 'src/app/entities/Appointment';
import { Paciente } from 'src/app/entities/Patient';
import { Day, DaysOfWeek } from 'src/app/entities/Schedule';
import { Especialista } from 'src/app/entities/Specialist';
import { Especialidad } from 'src/app/entities/Speciality';
import { SpecialityService } from 'src/app/services/speciality.service';
import { UserService } from 'src/app/services/user.service';
import { daysInWeek, format } from 'date-fns';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-appointment',
  templateUrl: './request-appointment.component.html',
  styleUrls: ['./request-appointment.component.css']
})
export class RequestAppointmentComponent {

  protected listOfSpecialities?: Especialidad[];
  protected selectedSpeciality?: Especialidad;
  protected hiddenSpeciality: boolean;
  protected hiddenSpecialist: boolean;
  protected hiddenSchedule: boolean;
  protected hiddenHours: boolean;
  protected hiddenPatient: boolean;
  protected listOfSpecialists?: Especialista[];
  protected listOfPatients?: Paciente[];
  protected selectedSpecialist?: Especialista;
  protected availableDays?: Day[] = [];
  protected appointmentDuration: number;
  protected selectedDay: Day;
  protected availableHours: number[] = [];
  protected selectedHour: number;
  protected dates: string[] = [];
  protected selectedDate?: string;
  protected hiddenAppointment: boolean;
  protected selectedPatient?: Paciente;
  protected hiddenButtons: boolean;
  protected hiddenStart: boolean;

  constructor(protected readonly uService: UserService, private sService: SpecialityService, private aService: AppointmentService, private alertService: AlertService, protected router: Router){
    this.selectedDay = new Day();
    this.appointmentDuration = 0;
    this.hiddenSpeciality = false;
    this.hiddenSchedule = true;
    this.hiddenSpecialist = true;
    this.hiddenButtons = true;

    this.hiddenPatient = true;
    this.hiddenHours = true;
    this.hiddenAppointment = true;
    this.hiddenStart = false;
    this.selectedHour = 0;
    this.setSpecialities();
    this.uService.getUsers();
    this.aService.getAppointments();
  }

  protected startSelection(){
    this.hiddenStart = true;
    this.hiddenButtons = false;
  }
 
  private async setSpecialities(){
    this.listOfSpecialities = await this.sService.getAllSpecialities();
  }

  protected selectSpeciality(speciality: Especialidad)
  {
    this.selectedSpeciality = speciality;
    this.hiddenSpeciality = true;
    this.hiddenSpecialist = false;
    this.setSpecialistsOptions();
  }

  protected setPatientOptions(){
    this.listOfPatients = this.uService.users.filter(user => user.userRole === 'paciente') as Paciente[];
  }

  protected setSpecialistsOptions(){
    let listSpecialists = this.uService.users.filter(user => user.userRole === 'especialista');
    this.listOfSpecialists = listSpecialists.filter(spec => spec.speciality.description === this.selectedSpeciality?.description) as Especialista[];
  }

  protected selectSpecialist(specialist: Especialista){
    this.selectedSpecialist = specialist;
    this.setSchedule();
    this.hiddenSpecialist = true;
    this.hiddenSchedule = false;
  }

  protected setSchedule(){
    if(this.selectedSpecialist?.speciality.schedule != undefined)
    {
      this.availableDays = this.generateDates(this.selectedSpecialist?.speciality.schedule.days!);
      this.appointmentDuration = this.selectedSpecialist.speciality.schedule.duration;
    }
  }

  protected selectDay(day: Day){
    this.selectedDay = day;
    this.setHours();
    this.hiddenSchedule = true;
    this.hiddenHours = false;
  }

  protected setHours(){
    let start = parseInt(this.selectedDay.timeStart);
    let end = parseInt(this.selectedDay.timeEnd);
    while(start < end)
    {
      this.availableHours.push(start);
      start = start + this.appointmentDuration;
    }
  }

  protected selectHours(startTime: number){
    this.selectedHour = startTime;
    this.hiddenHours = true;
    if(this.uService.userLogged?.userRole == 'admin')
    {
      this.setPatientOptions();
      this.hiddenPatient = false;
    }
    else
    {
      this.selectedPatient = this.uService.userLogged as Paciente;
      this.hiddenAppointment = false;
    }
  }

  protected generateDates(diasSemana: Day[]){
    const diasSemanaNum: { [key in DaysOfWeek]: number } = {
      [DaysOfWeek.Domingo]: 0,
      [DaysOfWeek.Lunes]: 1,
      [DaysOfWeek.Martes]: 2,
      [DaysOfWeek.Miercoles]: 3,
      [DaysOfWeek.Jueves]: 4,
      [DaysOfWeek.Viernes]: 5,
      [DaysOfWeek.Sabado]: 6,
    };

    let listaDias = diasSemana.map((dia) =>{
      return dia.dayOfWeek;
    });
    const fechaActual = new Date();
    const fechas: Day[] = [];
    const dosSemanas = 15;

    for (let i = 1; i < dosSemanas; i++) {
      const fecha = new Date(fechaActual);
      fecha.setDate(fecha.getDate() + i);

      const diaSemana = fecha.getDay();
      const diaSemanaEnum = Object.keys(diasSemanaNum).find(
          key => diasSemanaNum[key as DaysOfWeek] === diaSemana
      ) as DaysOfWeek;

      if (diaSemanaEnum && listaDias.includes(diaSemanaEnum)) {
        diasSemana.forEach(dia => {
          if(dia.dayOfWeek == diaSemanaEnum){
            let date = format(fecha, 'dd/MM/yyyy')
            fechas.push(new Day({dayOfWeek: diaSemanaEnum, date: date, timeStart: dia.timeStart, timeEnd: dia.timeEnd}));
          }
        });
      }
    }
    return fechas;
  }

  protected selectPatient(patient: Paciente){
    this.selectedPatient = patient;
    this.hiddenPatient = true;
    this.hiddenAppointment = false;
  }

  protected async createAppointment(){
    const newDay = new Day({
      dayOfWeek: this.selectedDay.dayOfWeek, 
      date: this.selectedDay.date,
      timeStart: this.selectedHour.toString(), 
      timeEnd: (this.selectedHour+this.appointmentDuration).toString()
    });
    if(this.selectedSpecialist != undefined && this.selectedPatient != undefined)
    {
      const appointment = new Turno({day: newDay, patient: this.selectedPatient, specialist: this.selectedSpecialist, state: 'Pendiente'});
      try {
        this.validateAppointment();
        await this.aService.saveAppointmenInStore(appointment);
        await this.alertService.showAlert({icon: 'success', message: 'Turno creado con exito!', timer: 2000});
        this.router.navigateByUrl('turnos/turnos');
      } catch (error: any) {
        await this.alertService.showAlert({icon: 'error', message: error.message, timer: 2000,});
      }
    }  
  }

  protected validateAppointment(): boolean{
    let retorno = true;
    this.aService.appointments.forEach((app) => {
      if(app.specialist.userId == this.selectedSpecialist?.userId && this.selectedDay.timeStart == app.day.timeStart)
      {
        throw new Error("El turno ya se encuentra ocupado!");
      }
    });
    return retorno;
  }

  protected return(option: string){
    switch (option)
    {
      case "A":
        this.hiddenStart = false;
        this.hiddenButtons = true;
        this.selectedSpeciality = undefined;
        this.selectedSpecialist = undefined;
        this.selectedDay = new Day();
        this.selectedHour = 0;
        this.selectedDate = undefined;
        this.selectedPatient = undefined;
        break;
      case "B":
        this.hiddenSpeciality = false;
        this.hiddenSpecialist = true;
        break;
      case "C":
        this.hiddenSpecialist = false;
        this.hiddenSchedule = true;
        break;
      case "D":
        this.hiddenSchedule = false;
        this.hiddenHours = true;
        break;
      case "E":
        this.hiddenHours = false;
        this.hiddenPatient = true;
        break;
      case "F":
        if(this.uService.userLogged?.userRole == 'paciente')
        {
          this.hiddenHours = false;
          this.hiddenAppointment = true;
        }
        else
        {
          this.hiddenPatient = false;
          this.hiddenAppointment = true;
        }
        break;
    }
  }

}
