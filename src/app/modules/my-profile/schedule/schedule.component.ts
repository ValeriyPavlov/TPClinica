import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';
import { Especialista } from 'src/app/entities/Specialist';
import { Day, DaysOfWeek, Schedule } from 'src/app/entities/Schedule';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})

export class ScheduleComponent {

  @Input() public showSchedule: boolean;
  @Output() public eventShowSchedule: EventEmitter<boolean>;
  protected schedule: Schedule;
  protected possibleDaysOfWeek: DaysOfWeek[];
  protected possibleTimes: number[];
  protected formSchedule: FormGroup;
  protected selectedDays: DaysOfWeek[];

  constructor(private readonly formBuilder: FormBuilder, private readonly uService: UserService, private readonly aService: AlertService) {
    this.eventShowSchedule = new EventEmitter();
    this.selectedDays = [];
    this.showSchedule = false;
    this.schedule = new Schedule();
    this.possibleDaysOfWeek = [
      DaysOfWeek.Lunes,
      DaysOfWeek.Martes,
      DaysOfWeek.Miercoles,
      DaysOfWeek.Jueves,
      DaysOfWeek.Viernes,
      DaysOfWeek.Sabado
    ];
    this.possibleTimes = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
    this.formSchedule = this.formBuilder.group({
      days: ['', Validators.required],
      timeStart: ['', Validators.required],
      timeEnd: ['', Validators.required],
      duration: ['', Validators.required]
    });
  }

  protected return() {
    this.showSchedule = !this.showSchedule;
    this.eventShowSchedule.emit(this.showSchedule);
  }

  protected selectDay($event: Event) {
    const input = $event.target as HTMLInputElement;

    if (input.checked) 
    {
      this.selectedDays.push(input.value as DaysOfWeek);
    } 
    else 
    {
      const index = this.selectedDays.findIndex((d) => d === input.value);
      if (index > -1) 
      {
        this.selectedDays.splice(index, 1);
      }
    }

    if (this.selectedDays.length === 0) {
      this.formSchedule.controls['days'].reset();
    }
  }

  protected async register() {
    if (this.formSchedule.valid) 
    {
      try 
      {
        this.timeValidator();
        const user = this.uService.userLogged as Especialista;
        this.createSchedule(user.speciality);
        user.speciality.schedule = this.schedule;
        await this.uService.saveUserWithIdInStore(user.userId, user);
        await this.aService.showAlert({icon: 'success', message: 'Horarios cargados exitosamente.', timer: 2000});
        this.selectedDays = [];
        this.formSchedule.reset({timeStart: "Elija una opcion", timeEnd: "Elija una opcion"});
      } 
      catch (error: any) 
      {
        await this.aService.showAlert({icon: 'error', message: error.message, timer: 2000});
      }
    } else {
      await this.aService.showAlert({icon: 'error', message: 'Complete todos los campos!', timer: 2000});
    }
  }

  private timeValidator() {
    if ( parseInt(this.formSchedule.value.timeStart) >= parseInt(this.formSchedule.value.timeEnd)) 
    {
      throw new Error('El horario de inicio no puede ser mayor o igual que el de finalizacion.');
    }
    if(this.selectedDays.includes(DaysOfWeek.Sabado) && parseInt(this.formSchedule.value.timeEnd) > 14)
    {
      throw new Error ('El horario laboral para los dias sabados es hasta las 14 hs.');
    }
  }

  protected createSchedule(speciality: any){
    let arrayDays: Day[] = [];
    if(speciality.schedule.days != undefined)
    {
      speciality.schedule.days.forEach((day: any) => {
        arrayDays.push(day);
      });
    }
    this.selectedDays.forEach(sDay => {
      let curr = arrayDays?.find(d => d.dayOfWeek === sDay)
      if(curr != undefined)
      {
        curr.timeStart = this.formSchedule.value.timeStart;
        curr.timeEnd = this.formSchedule.value.timeEnd;
      }
      else
      {
        let newDay = new Day();
        newDay.dayOfWeek = sDay;
        newDay.timeStart = this.formSchedule.value.timeStart;
        newDay.timeEnd = this.formSchedule.value.timeEnd;
        arrayDays.push(newDay);
      }
    });
    this.schedule.days = arrayDays;
    this.schedule.duration = parseFloat(this.formSchedule.value.duration);
  }

  protected async resetSchedule(){
    let baseSchedule = new Schedule();
    const user = this.uService.userLogged as Especialista;
    await this.aService.showAlert({icon: 'warning', message: 'Esta seguro que desea reestablecer su disponibilidad? Cancelara todos sus turnos.', showCancelButton: true, showConfirmButton: true, })
    .then(async (result) => {
      if (result.isConfirmed) {
        user.speciality.schedule = baseSchedule;
        await this.uService.saveUserWithIdInStore(user.userId, user);
        await this.aService.showAlert({icon: 'success', message: 'Horarios reestablecidos exitosamente.', timer: 2000});
      }
    });
  }

  
}
