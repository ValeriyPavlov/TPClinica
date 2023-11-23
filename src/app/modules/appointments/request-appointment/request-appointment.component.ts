import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/entities/Appointment';
import { Paciente } from 'src/app/entities/Patient';
import { Day, DaysOfWeek } from 'src/app/entities/Schedule';
import { Especialista } from 'src/app/entities/Specialist';
import { Especialidad } from 'src/app/entities/Speciality';
import { SpecialityService } from 'src/app/services/speciality.service';
import { UserService } from 'src/app/services/user.service';
import { format } from 'date-fns';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

const enterTransition = transition(':enter', [style({opacity: 0}), animate('1s ease-in', style({opacity:1}))]);
const exitTransition = transition(':enter', [style({opacity: 1}), animate('500ms ease-out', style({opacity:0}))]);
const fadeIn = trigger('fadeIn', [enterTransition]);
const fadeOut = trigger('fadeOut', [exitTransition]);

@Component({
  selector: 'app-request-appointment',
  templateUrl: './request-appointment.component.html',
  styleUrls: ['./request-appointment.component.css'],
  animations: [fadeIn, fadeOut]
})
export class RequestAppointmentComponent implements OnInit{

  protected listOfSpecialities?: Especialidad[];
  protected listOfAppointments?: Day[] = [];
  protected selectedSpeciality: string;
  protected hiddenSpeciality: boolean;
  protected hiddenSpecialist: boolean;
  protected hiddenSchedule: boolean;
  protected hiddenHours: boolean;
  protected hiddenPatient: boolean;
  protected listofUsers?: any[] = [];
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
  protected selectedPatient?: Paciente;
  protected hiddenStart: boolean;
  protected ref: any;

  constructor(protected readonly uService: UserService, private sService: SpecialityService, private aService: AppointmentService, private alertService: AlertService, protected router: Router){
    this.selectedDay = new Day();
    this.appointmentDuration = 0;
    this.hiddenSpeciality = true;
    this.hiddenSchedule = true;
    this.hiddenSpecialist = false;
    this.hiddenPatient = true;
    this.hiddenHours = true;
    this.hiddenStart = false;
    this.selectedHour = 0;
    this.selectedSpeciality = "";
    this.aService.getAppointments();
    this.setSpecialities();
  }


  ngOnInit(): void {
    this.getSpecialists();
    this.ref = this.uService.getAllUsers().subscribe(
      (data: any) => {
        this.listofUsers = data;
        this.listOfSpecialists = this.listofUsers?.filter(esp => esp.userRole == 'especialista') as Especialista[];
        this.ref.unsubscribe();
      },
      (error) => {
        console.error('Error al obtener datos:', error);
      }
    );
  }

  protected async getSpecialists(){
    await this.uService.getUsers()
  }

  private async setSpecialities(){
    this.listOfSpecialities = await this.sService.getAllSpecialities();
  }

  protected selectSpeciality(speciality: string)
  {
    this.selectedSpeciality = speciality;
    this.setSchedule();
    this.hiddenSpeciality = true;
    this.hiddenSchedule = false;
  }

  protected setPatientOptions(){
    this.listOfPatients = this.uService.users.filter(user => user.userRole === 'paciente') as Paciente[];
  }

  protected async setSpecialistsOptions(){
    await this.uService.getUsers();
    return this.uService.users.filter(user => user.userRole === 'especialista') as Especialista[];
  }

  protected selectSpecialist(specialist: Especialista){
    this.selectedSpecialist = specialist;
    this.hiddenSpecialist = true;
    this.hiddenSpeciality = false;
  }

  protected setSchedule(){
    if(this.selectedSpecialist?.speciality.schedule != undefined)
    {
      this.availableDays = this.generateDates(this.selectedSpecialist?.speciality.schedule.days!);
      this.appointmentDuration = this.selectedSpecialist.speciality.schedule.duration;
    }
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

  protected setHours(day: Day){
    let hours: number[] = [];
    let start = parseFloat(day.timeStart);
    let end = parseFloat(day.timeEnd);
    while(start < end)
    {
      hours.push(start);
      start = start + this.appointmentDuration;
    }
    return hours;
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
      this.createAppointment();
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
    this.createAppointment();
  }

  protected selectAppointment(day: Day, time: number){
    this.selectedDay = day;
    this.selectedHour = time;
    this.hiddenSchedule = true;
    if(this.uService.userLogged?.userRole == 'admin')
    {
      this.setPatientOptions();
      this.hiddenPatient = false;
    }
    else
    {
      this.selectedPatient = this.uService.userLogged as Paciente;
      this.createAppointment();
    }
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
      const appointment = new Turno({day: newDay, patient: this.selectedPatient, specialist: this.selectedSpecialist, state: 'Pendiente', speciality: this.selectedSpeciality});
      try {
        this.validateAppointment(newDay);
        await this.aService.saveAppointmenInStore(appointment);
        await this.alertService.showAlert({icon: 'success', message: 'Turno creado con exito!', timer: 2000});
        this.router.navigateByUrl('turnos/turnos');
      } catch (error: any) {
        await this.alertService.showAlert({icon: 'error', message: error.message, timer: 2000,});
      }
    }  
  }

  protected hideTaken(id: string, date: string, hour: number){
    let retorno = false;
    this.aService.appointments.forEach(turno => {
      if(turno.day.date == date && turno.day.timeStart == hour.toString() && id == turno.specialist.userId)
      {
        retorno = true;
      }
    });
    return retorno;
  }

  protected validateAppointment(day: Day) {
    this.aService.appointments.forEach((app) => {
      if(app.specialist.userId == this.selectedSpecialist?.userId && day.timeStart == app.day.timeStart && day.date == app.day.date)
      {
        throw new Error("El turno ya se encuentra ocupado!");
      }
    });
  }

  protected return(option: string){
    switch (option)
    {
      case "A":
        this.hiddenSpecialist = false;
        this.hiddenSpeciality = true;
        break;
      case "B":
        this.hiddenSpeciality = false;
        this.hiddenSchedule = true;
        break;
      case "C":
        this.hiddenSchedule = false;
        this.hiddenPatient = true;
        break;
    }
  }

  

}
