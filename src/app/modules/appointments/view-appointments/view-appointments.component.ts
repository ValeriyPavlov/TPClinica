import { Component, OnInit } from '@angular/core';
import { AppointmentState, Turno } from 'src/app/entities/Appointment';
import { Question, Survey } from 'src/app/entities/Survey';
import { AlertService } from 'src/app/services/alert.service';
import { AppointmentService } from 'src/app/services/appointment.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';



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

  constructor(public aService: AppointmentService, public alertService: AlertService, public uService: UserService) {}

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

  protected async cancelAppointment2(appointment: Turno){
    let result = await this.alertService.showConfirm({icon: 'info', message: "Ingrese la razon de la cancelacion:", input: 'text'});
    if(result != undefined && result != false)
    {
      await this.aService.saveAppointmentWithIdInStore(appointment?.id!, { ...appointment!, state: "Cancelado", review: result});
      await this.alertService.showAlert({icon: 'success', message: `Turno CANCELADO con exito`, timer: 2000});
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
    }
    else {
      await this.alertService.showAlert({icon: 'error', message: 'Debe dejar una reseña al momento cancelar el turno', timer: 2000});
    }
  }

  protected async finishAppointment(appointment: Turno) {
    let review = await this.alertService.showConfirm({icon: 'info', message: "Ingrese una reseña:", input: 'text'});
    let diagnose = await this.alertService.showConfirm({icon: 'info', message: "Ingrese el diagnostico:", input: 'text'});
    if (review != undefined && review != false && diagnose != undefined && diagnose != false) {
      try {
        await this.aService.saveAppointmentWithIdInStore(appointment?.id!, { ...appointment!, state: "Realizado", review: review, diagnose: diagnose});
        await this.alertService.showAlert({icon: 'success', message: 'Turno Finalizado con exito', timer: 2000}); 
        this.listOfAppointmentsFiltered = this.aService.appointments.filter(app => app.specialist.userId == this.uService.userLogged?.userId) as Turno[];
      } catch (error: any) {
        await this.alertService.showAlert({icon: 'error',  message: error.message, timer: 2000});
      }
    } else {
      await this.alertService.showAlert({icon: 'error', message: 'Debe dejar una reseña y el diagnostico al momento finalizar el turno', timer: 2000});
    }
  }

  protected async showAccept(appointment: Turno){
    try {
      await this.aService.saveAppointmentWithIdInStore(appointment?.id!, { ...appointment!, state: "Aceptado"});
      await this.alertService.showAlert({icon: 'success', message: 'Turno Aceptado con exito', timer: 2000});
      this.listOfAppointmentsFiltered = this.aService.appointments.filter(app => app.specialist.userId == this.uService.userLogged?.userId) as Turno[];
    } catch (error: any) {
      await this.alertService.showAlert({icon: 'error',  message: error.message, timer: 2000});
    }
  }


  protected async showSurvey(appointment: Turno){
    let result1 = await this.alertService.showSurvey({icon: 'info', message: "¿Recomendario nuestra pagina a sus amigos?", input: 'radio', inputOptions: {'Si': 'Si', 'No': 'No'}});
    let result2 = await this.alertService.showSurvey({icon: 'info', message: "¿Consideras que nuestro sitio web es facil de usar/navegar?", input: 'radio', inputOptions: {'Si': 'Si', 'No': 'No', 'Mas o Menos': 'Mas o Menos'}});
    let result3 = await this.alertService.showSurvey({icon: 'info', message: "Indica como encontraste nuestra pagina:", input: 'radio', inputOptions: {'Internet': 'Internet', 'Amigos': 'Amigos', 'Noticias': 'Noticias'}});
    if(result1 && result2 && result3)
    {
      let questionR = new Question({question: "¿Recomendarias nuestro sitio web a tus amigos?", response: result1});
      let questionE = new Question({question: "¿Consideras que nuestro sitio web es facil de usar/navegar?", response: result2});
      let questionW = new Question({question: "Indica como encontraste nuestra pagina:", response: result3});
      let list = [];
      list.push(questionR);
      list.push(questionE);
      list.push(questionW);
      let survey = new Survey({questions: list});
      await this.aService.saveAppointmentWithIdInStore(appointment?.id!, { ...appointment!, survey: survey});
      await this.alertService.showAlert({icon: 'success', message: 'Encuesta cargada con exito.', timer: 2000});
    }

  }

  protected async showReview(appointment: Turno){
    this.alertService.showSimple(appointment.review!);
  }

  protected async sendRating(appointment: Turno){
    let result = await this.alertService.showConfirm({icon: 'info', message: "Ingrese un comentario:", input: 'text'});
    if(result != undefined && result != false)
    {
      await this.aService.saveAppointmentWithIdInStore(appointment?.id!, { ...appointment!, comment: result});
      await this.alertService.showAlert({icon: 'success', message: 'Calificado con exito.', timer: 2000});
    }
  }


}
