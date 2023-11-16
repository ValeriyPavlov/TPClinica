import { Component, OnInit } from '@angular/core';
import { AppointmentState, Turno } from 'src/app/entities/Appointment';
import { Question, Survey } from 'src/app/entities/Survey';
import { AlertService } from 'src/app/services/alert.service';
import { AppointmentService } from 'src/app/services/appointment.service';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-view-appointments',
  templateUrl: './view-appointments.component.html',
  styleUrls: ['./view-appointments.component.css']
})
export class ViewAppointmentsComponent implements OnInit{

  protected listOfAppointmentsFiltered: Turno[] = []; 
  protected listOfAppointmentsFilteredSpec: Turno[] = [];
  protected listOfAppointmentsFilteredPac: Turno[] = [];
  protected ref: any;
  protected surveyReco: string | undefined;
  protected surveyWay: string | undefined;
  protected surveyEasy: string | undefined;
  protected diagnose: any;
  protected reason: any;
  protected comment: any;
  protected hiddenCancelar: boolean;
  protected hiddenButtons: boolean;
  protected hiddenFinish: boolean;
  protected hiddenReview: boolean;
  protected hiddenReject: boolean;
  protected hiddenSurvey: boolean;
  protected hiddenCalif: boolean;
  protected rating: any;
  protected appointmentSelected?: Turno;
  constructor(public aService: AppointmentService, public alertService: AlertService, public uService: UserService) {
    this.hiddenCancelar = true;
    this.hiddenButtons = true;
    this.hiddenFinish = true;
    this.hiddenReview = true;
    this.hiddenCalif = true;
    this.hiddenReject = true;
    this.hiddenSurvey = true;
  }

  ngOnInit(): void{
    this.getAllAppointments();
  this.ref = this.aService.getAllAppointments().subscribe(
    (data: any) => {
      this.listOfAppointmentsFiltered = data;
      if(this.uService.userLogged?.userRole == "especialista")
      {
        this.listOfAppointmentsFiltered = this.aService.appointments.filter(app => app.specialist.userId == this.uService.userLogged?.userId) as Turno[];
      }
      else
      {
        if(this.uService.userLogged?.userRole == "paciente")
        {
          this.listOfAppointmentsFiltered = this.aService.appointments.filter(app => app.patient.userId == this.uService.userLogged?.userId) as Turno[];
        }
      }
      this.unsub();
    },
    (error) => {
      console.error('Error al obtener datos:', error);
    }
  );
  }

  unsub(): void {
    this.ref.unsubscribe();
  }
  
  protected async getAllAppointments(){
    await this.aService.getAppointments()
  }

  protected searchAppoinment($event: Event) {
    const input = $event.target as HTMLInputElement;
    const textInput = input.value.toLowerCase();
    if(this.uService.userLogged?.userRole == "paciente")
    {
      this.listOfAppointmentsFiltered = this.aService.appointments.filter(app => app.patient.userId == this.uService.userLogged?.userId && (app.specialist.speciality.description.toLowerCase().includes(textInput) || app.specialist.lastName.toLowerCase().includes(textInput) || app.specialist.name.toLowerCase().includes(textInput))) as Turno[];
    }
    else
    {
      if(this.uService.userLogged?.userRole == "especialista"){
        this.listOfAppointmentsFiltered = this.aService.appointments.filter(app => app.specialist.userId == this.uService.userLogged?.userId && ( app.specialist.speciality.description.toLowerCase().includes(textInput) || app.patient.lastName.toLowerCase().includes(textInput) || app.patient.name.toLowerCase().includes(textInput))) as Turno[];
      }
      else
      {
        this.listOfAppointmentsFiltered = this.aService.appointments.filter(app => app.specialist.speciality.description.toLowerCase().includes(textInput) || app.specialist.lastName.toLowerCase().includes(textInput) || app.specialist.name.toLowerCase().includes(textInput)) as Turno[];

      }
    }
  }

  protected chooseElement(appointment: Turno){
    this.appointmentSelected = appointment;
    if(appointment.state == "Pendiente" || appointment.state == "Cancelado")
    {
      this.hiddenCancelar = false;
    }
    else
    {
      this.hiddenCancelar = true;
      this.reason = undefined;
    }
  }

  protected chooseElementSpec(appointment: Turno){
    this.appointmentSelected = appointment;
    this.hiddenButtons = false;
    this.hiddenReview = true;
    this.hiddenCancelar = true;
    this.hiddenReject = true;
    this.hiddenFinish = true;
  }

  protected chooseElementPat(appointment: Turno){
    this.appointmentSelected = appointment;
    this.hiddenButtons = false;
    this.hiddenReview = true;
    this.hiddenCancelar = true;
    this.hiddenSurvey = true;
    this.hiddenCalif = true;
  }

  protected async cancelAppointment(state: AppointmentState, review: string) {
    if (review != undefined && review != "") {
      try {
        await this.aService.saveAppointmentWithIdInStore(this.appointmentSelected?.id!, { ...this.appointmentSelected!, state: state, review: review});
        await this.alertService.showAlert({icon: 'success', message: `Turno ${state} con exito`, timer: 2000});
        this.appointmentSelected = undefined;
        this.hiddenButtons = true;
        if(state == "Cancelado"){
          this.hiddenCancelar = true;
        }
        else{
          if(state == "Rechazado")
          {
            this.hiddenReject = true
          }
        }
        if(this.uService.userLogged?.userRole == 'paciente'){
          this.listOfAppointmentsFiltered = this.aService.appointments.filter(app => app.patient.userId == this.uService.userLogged?.userId) as Turno[];
        }
        else{
          if(this.uService.userLogged?.userRole == 'especialista'){
            this.listOfAppointmentsFiltered = this.aService.appointments.filter(app => app.specialist.userId == this.uService.userLogged?.userId) as Turno[];
          }
          else
          {
            this.listOfAppointmentsFiltered = this.aService.appointments.filter(app => app.specialist.speciality.description.toLowerCase().includes("") || app.specialist.lastName.toLowerCase().includes("") || app.specialist.name.toLowerCase().includes("")) as Turno[];
          }
        }
      } catch (error: any) {
        await this.alertService.showAlert({icon: 'error',  message: error.message, timer: 2000});
      }
      this.reason = undefined;
    } else {
      await this.alertService.showAlert({icon: 'error', message: 'Debe dejar una reseña al momento cancelar el turno', timer: 2000});
    }
  }

  protected async finishAppointment(review: string, diagnose: string) {
    if (review != undefined && review != "" && diagnose != undefined && diagnose != "") {
      try {
        await this.aService.saveAppointmentWithIdInStore(this.appointmentSelected?.id!, { ...this.appointmentSelected!, state: "Realizado", review: review, diagnose: diagnose});
        await this.alertService.showAlert({icon: 'success', message: 'Turno Finalizado con exito', timer: 2000}); 
        this.appointmentSelected = undefined;
        this.hiddenButtons = true;
        this.hiddenFinish = true;
        this.listOfAppointmentsFiltered = this.aService.appointments.filter(app => app.specialist.userId == this.uService.userLogged?.userId) as Turno[];
      } catch (error: any) {
        await this.alertService.showAlert({icon: 'error',  message: error.message, timer: 2000});
      }
      this.reason = undefined;
      this.diagnose = undefined;
    } else {
      await this.alertService.showAlert({icon: 'error', message: 'Debe dejar una reseña y el diagnostico al momento finalizar el turno', timer: 2000});
    }
  }

  protected async showAccept(){
    try {
      await this.aService.saveAppointmentWithIdInStore(this.appointmentSelected?.id!, { ...this.appointmentSelected!, state: "Aceptado"});
      await this.alertService.showAlert({icon: 'success', message: 'Turno Aceptado con exito', timer: 2000});
      this.appointmentSelected = undefined;
      this.hiddenButtons = true;
      this.listOfAppointmentsFiltered = this.aService.appointments.filter(app => app.specialist.userId == this.uService.userLogged?.userId) as Turno[];
    } catch (error: any) {
      await this.alertService.showAlert({icon: 'error',  message: error.message, timer: 2000});
    }
  }

  protected showSurvey(){
    this.hiddenSurvey = !this.hiddenSurvey;
    this.surveyReco = undefined;
    this.surveyWay = undefined;
    this.surveyEasy = undefined;
  }

  protected showReview(){
    this.hiddenReview = !this.hiddenReview;
  }

  protected showReject(){
    this.hiddenReject = !this.hiddenReject;
  }

  protected showFinish(){
    this.hiddenFinish = !this.hiddenFinish;
  }

  protected showCancel(){
    this.hiddenCancelar = !this.hiddenCancelar;
  }

  protected showCalif(){
    this.hiddenCalif = !this.hiddenCalif;
    this.comment = undefined;
    this.rating = undefined;
  }

  protected async completeSurvey(){
    if(this.surveyEasy != undefined && this.surveyReco != undefined && this.surveyWay != undefined){
      let questionR = new Question({question: "¿Recomendarias nuestro sitio web a tus amigos?", response: this.surveyReco});
      let questionE = new Question({question: "¿Consideras que nuestro sitio web es facil de usar/navegar?", response: this.surveyEasy});
      let questionW = new Question({question: "Indica como encontraste nuestra pagina:", response: this.surveyWay});
      let list = [];
      list.push(questionR);
      list.push(questionE);
      list.push(questionW);
      let survey = new Survey({questions: list});
      await this.aService.saveAppointmentWithIdInStore(this.appointmentSelected?.id!, { ...this.appointmentSelected!, survey: survey});
      await this.alertService.showAlert({icon: 'success', message: 'Encuesta cargada con exito.', timer: 2000});
      this.showSurvey();
    }
    else
    {
      await this.alertService.showAlert({icon: 'error', message: 'Debe marcar cada uno de los campos!', timer: 2000});
    }
  }

  protected async sendRating(){
    if(this.comment != undefined && this.rating != undefined)
    {
      await this.aService.saveAppointmentWithIdInStore(this.appointmentSelected?.id!, { ...this.appointmentSelected!, calification: this.rating, comment: this.comment});
      await this.alertService.showAlert({icon: 'success', message: 'Comentario cargado con exito.', timer: 2000});
      this.showCalif();
    }
    else
    {
      await this.alertService.showAlert({icon: 'error', message: 'Debe dejar una calificacion y un comentario!', timer: 2000});
    }
  }


}
