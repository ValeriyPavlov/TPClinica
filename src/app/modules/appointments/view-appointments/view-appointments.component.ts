import { Component, OnInit } from '@angular/core';
import { AppointmentState, Turno } from 'src/app/entities/Appointment';
import { Diagnostico, DynamicData } from 'src/app/entities/MedicalRecord';
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
  protected diagnosis: Diagnostico | undefined;
  protected review: string | undefined;
  protected selectedAppointment: Turno | undefined;
  protected surveyReco: string | undefined;
  protected surveyWay: string | undefined;
  protected surveyEasy: string | undefined;
  protected hiddenDiagnose: boolean;
  protected reason: any;
  protected comment: any;

  constructor(public aService: AppointmentService, public alertService: AlertService, public uService: UserService) {
    this.hiddenDiagnose = false;
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
      this.listOfAppointmentsFiltered = this.aService.appointments.filter(app => 
        app.patient.userId == this.uService.userLogged?.userId && 
        (
          app.speciality?.toLowerCase().includes(textInput) || 
          app.specialist.lastName.toLowerCase().includes(textInput) || 
          app.specialist.name.toLowerCase().includes(textInput) ||
          app.patient.lastName.toLowerCase().includes(textInput) || 
          app.patient.name.toLowerCase().includes(textInput) ||
          app.state?.toString().toLowerCase().includes(textInput) ||
          app.day.dayOfWeek.toLowerCase().includes(textInput) || 
          app.day.date?.toString().includes(textInput) ||
          app.review?.includes(textInput) ||
          app.day.timeStart.toString().includes(textInput) || 
          app.day.timeEnd.toString().includes(textInput) ||
          (app.day.timeStart.toString().includes(".5") && textInput.includes("3")) ||
          (app.day.timeEnd.toString().includes(".5") && textInput.includes("3")) ||
          this.filterDiagnosis(app, textInput)
        )) as Turno[];
    }
    else
    {
      if(this.uService.userLogged?.userRole == "especialista"){
        this.listOfAppointmentsFiltered = this.aService.appointments.filter(app => 
          app.specialist.userId === this.uService.userLogged?.userId && 
          ( 
            app.speciality?.toLowerCase().includes(textInput) || 
            app.patient.lastName.toLowerCase().includes(textInput) || 
            app.patient.name.toLowerCase().includes(textInput) ||
            app.state?.toString().toLowerCase().includes(textInput) ||
            app.day.dayOfWeek.toLowerCase().includes(textInput) || 
            app.day.date?.toString().includes(textInput) ||
            app.specialist.lastName.includes(textInput) ||
            app.specialist.name.includes(textInput) ||
            app.review?.includes(textInput) ||
            app.day.timeStart.toString().includes(textInput) || 
            app.day.timeEnd.toString().includes(textInput) ||
            (app.day.timeStart.toString().includes(".5") && textInput.includes("3")) ||
            (app.day.timeEnd.toString().includes(".5") && textInput.includes("3")) ||
            this.filterDiagnosis(app, textInput)
          )) as Turno[];
      }
      else
      {
        if(this.uService.userLogged?.userRole == "admin"){
          this.listOfAppointmentsFiltered = this.aService.appointments.filter(app => app.speciality?.toLowerCase().includes(textInput) || app.specialist.lastName.toLowerCase().includes(textInput) || app.specialist.name.toLowerCase().includes(textInput)) as Turno[];
        }
      }
    }
  }

  protected filterDiagnosis(app: Turno, data: string){
    let retorno = false;
    if(app.diagnosis != undefined){
      const {pressure, weight, height, temperature, dynamicData} = app.diagnosis as Diagnostico;
      if(pressure.toString().includes(data) || 
        weight.toString().includes(data) || 
        height.toString().includes(data) || 
        temperature.toString().includes(data) 
        )
      {
        retorno = true;
      }
      const dynamicDataArray = dynamicData as DynamicData[];
      dynamicDataArray.forEach(dato => {
        if((dato.key).toLowerCase().includes(data) || (dato.value).toLowerCase().includes(data)){
          retorno = true;
        }
      });
    }
    return retorno;
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
          this.listOfAppointmentsFiltered = this.aService.appointments.filter(app => app.specialist.speciality.description.includes("") || app.specialist.lastName.toLowerCase().includes("") || app.specialist.name.toLowerCase().includes("")) as Turno[];//
        }
      }
    }
    else {
      await this.alertService.showAlert({icon: 'error', message: 'Debe dejar una reseña al momento cancelar el turno', timer: 2000});
    }
  }

  protected async finishAppointment(appointment: Turno) {
    this.review = await this.alertService.showConfirm({icon: 'info', message: "Ingrese una reseña:", input: 'text'});
    if(this.review != ""){
      this.hiddenDiagnose = true;
      this.selectedAppointment = appointment;
    }
    else{
      await this.alertService.showAlert({icon: 'error', message: 'Debe dejar una reseña y el diagnostico para finalizar el turno', timer: 2000});
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

  protected async handleDiagnosis(data: Diagnostico){
    this.diagnosis = data;
    if (this.review != undefined && this.review != "" && this.diagnosis != undefined) {
      try {
        await this.aService.saveAppointmentWithIdInStore(this.selectedAppointment?.id!, { ...this.selectedAppointment!, state: "Realizado", review: this.review, diagnosis: this.diagnosis});
        await this.alertService.showAlert({icon: 'success', message: 'Turno Finalizado con exito', timer: 2000}); 
        this.hiddenDiagnose = false;
        this.listOfAppointmentsFiltered = this.aService.appointments.filter(app => app.specialist.userId == this.uService.userLogged?.userId) as Turno[];
        this.selectedAppointment = undefined;
        this.review = undefined;
      } catch (error: any) {
        await this.alertService.showAlert({icon: 'error',  message: error.message, timer: 2000});
      }
    }
  }

  

}
