import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAuthProvider } from '../providers/firebase_auth.provider';
import { FirebaseStoreProvider } from '../providers/firebase_store.provider';
import { FirebaseStorageProvider } from '../providers/firebase_storage.provider';
import { User } from '../entities/User';
import { Especialista } from '../entities/Specialist';
import { collection, count, getFirestore, onSnapshot, query } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environments';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import { Diagnostico } from '../entities/MedicalRecord';
import { Turno } from '../entities/Appointment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public users: any[] = [];
  public usersQuickAccess: any[] = [];
  public patientPhotoTwo?: string;

  constructor(private readonly firebaseAuthProvider: FirebaseAuthProvider, private readonly firebaseStoreProvider: FirebaseStoreProvider, private readonly firebaseStorageProvider: FirebaseStorageProvider,private readonly router: Router) {}


  public async loginWithEmailAndPassword(email: string, password: string) {
    const user = await this.firebaseAuthProvider.loginWithEmailAndPassword(email, password);
    return user;
  }


  public async registerWithFirebase(newUser: User) {
    const user = await this.firebaseAuthProvider.registerUserWithEmailAndPassword(newUser);
    return user;
  }


  public async getUsers(){
    const q = query(collection(db, "usuarios"));
    onSnapshot(q, (col) => {
      this.users = [];
      col.forEach(async (doc) =>{
        var usuario = doc.data() as User;
        if(usuario.userRole == "paciente"){
          this.users.push({...usuario, profilePhoto: (await this.getProfilePhoto(usuario)) as string, profilePhotoTwo: (await this.getProfilePhoto(usuario, 2)) as string});
        }
        else
        {
          this.users.push({...usuario, profilePhoto: (await this.getProfilePhoto(usuario)) as string});
        }
      });
      return this.users;
    });
  }

  public async getUsersForQuickAccess(){
    // Users Max Count for each userRole
    let numPacientes = 3;
    let numEspecialistas = 2;
    let numAdmins = 1;
    const q = query(collection(db, "usuarios"));
    onSnapshot(q, (col) => {
      this.usersQuickAccess = [];
      col.forEach(async (doc) =>{
        var usuario = doc.data() as User;
        if(usuario.userRole == "paciente" && numPacientes > 0 && usuario.verified == true)
        {
          numPacientes = numPacientes - 1;
          this.usersQuickAccess.push({...usuario, profilePhoto: (await this.getProfilePhoto(usuario)) as string});
        }
        if(usuario.userRole == "especialista" && numEspecialistas > 0 && usuario.verified == true)
        {
          numEspecialistas = numEspecialistas - 1;
          this.usersQuickAccess.push({...usuario, profilePhoto: (await this.getProfilePhoto(usuario)) as string});
        }
        if(usuario.userRole == "admin" && numAdmins > 0 && usuario.verified == true)
        {
          numAdmins = numAdmins - 1;
          this.usersQuickAccess.push({...usuario, profilePhoto: (await this.getProfilePhoto(usuario)) as string});
        }
      });
      return this.usersQuickAccess;
    });
  }

  public async getPatientPhotoTwo(){
    this.patientPhotoTwo = await this.getProfilePhoto(this.userLogged, 2) as string;
  }


  public saveUserWithIdInStore(id: string, user: User) {
    return this.firebaseStoreProvider.setDocWithId('usuarios', id, JSON.parse(JSON.stringify(user)));
  }


  public async logout() {
    await this.firebaseAuthProvider.signOut();
    await this.router.navigateByUrl('ingresar');
  }


  public uploadPhoto(fileName: string, file: any) {
    const reference = this.firebaseStorageProvider.referenceCloudStorage(fileName);
    return this.firebaseStorageProvider.uploadFile(reference, file);
  }


  public get userLogged() {
    return this.firebaseAuthProvider.userLogged;
  }


  public async authorizeSpecialistByAdmin(user: User) {
    const specialist = user as Especialista;
    specialist.verifiedByAdmin = !specialist.verifiedByAdmin;
    await this.saveUserWithIdInStore(specialist.userId, specialist);
    return specialist.verifiedByAdmin;
  }

  
  private async getProfilePhoto(user: any, photo=1) {
    try {
      if(photo == 2)
      {
        const reference = this.firebaseStorageProvider.referenceCloudStorage(user.profilePhotoTwo);
        const url = await this.firebaseStorageProvider.getUrlFromFile(reference);
        return url;
      }
      else
      {
        const reference = this.firebaseStorageProvider.referenceCloudStorage(user.profilePhoto);
        const url = await this.firebaseStorageProvider.getUrlFromFile(reference);
        return url;
      }
    } 
    catch (error) {
      console.warn('No se obtuvo la imagen del usuario');
    }
    return undefined;
  }

  public getAllUsers() {
    return this.firebaseStoreProvider.getCollection('usuarios');
  }


  public exportUsersToXls(users: User[], fileName: string) {
    const usersMapped = users.map((user) => {
      return {
        Apellido: `${user.lastName}`,
        Nombre: `${user.name}`,
        Email: `${user.email}`,
        Dni: `${user.dni}`,
        Edad: `${user.age}`,
        Rol: `${user.userRole}`,
      };
    });
    const workSheet = XLSX.utils.json_to_sheet(usersMapped);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, 'usuarios');
    XLSX.writeFile(workBook, `${fileName}.xlsx`);
  }

  public exportUserToXls(appointments: Turno[], user: User, fileName: string){
    const appointmentsMapped = appointments.map((app) =>{
      return {
        Especialista: `${app.specialist.lastName}, ${app.specialist.name}`,
        Paciente: `${app.patient.lastName}, ${app.patient.name}`,
        Especialidad: `${app.speciality}`,
        Fecha: `${app.day.date}`,
        HoraInicio: this.formatHours(app.day.timeStart),
        HoraFin: this.formatHours(app.day.timeEnd),
      };
    });
    const workSheet = XLSX.utils.json_to_sheet(appointmentsMapped);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, 'usuarios');
    XLSX.writeFile(workBook, `${fileName}.xlsx`);
  }

  public formatHours(hour: string){
    if(hour.includes('.'))
    {
      return (Math.floor(parseFloat(hour))).toString() + ':30';
    }
    else
    {
      return hour + ':00';
    }
  }

  public createPdf(appointments: Turno[], user: User) {
    const pdfFile = new jsPDF('portrait', 'px', 'a4');
    const image = new Image();

    const pageHeight = pdfFile.internal.pageSize.height;
    image.src = '../../assets/img/icono.png';
    pdfFile.text('HISTORIAL CLINICO DE:  ' + user.lastName + ', ' + user.name, 140, 70);
    const date = new Date().toLocaleString();
    pdfFile.addImage(image, 'PNG', 10, 10, 75, 75);
    pdfFile.text('Fecha Emisión: ' + date, 240, 20);
    let y = 50;
    let position = this.updatePosition();

    //console.log("Height",pageHeight); 631
    appointments.forEach((app) => {

      if(y <= pageHeight){
        y += 200;
      }
      else
      {
        pdfFile.addPage();
        position = this.updatePosition(true);
        y = 35;
      }

      pdfFile.text(
        `Fecha: ${(app.day.dayOfWeek).toUpperCase()} - ${app.day.date}`,
        35,
        position()
      );
      pdfFile.text(
        `Especialidad: ${app.speciality}`,
        35,
        position()
      );
      pdfFile.text(
        `Especialista: ${app.specialist.lastName}, ${app.specialist.name}`,
        35,
        position()
      );
      let diagnosis = app.diagnosis as Diagnostico;
      pdfFile.text(`Altura: ${diagnosis.height} Cm`, 35, position());
      pdfFile.text(`Peso: ${diagnosis.weight} Kg`, 35, position());
      pdfFile.text(`Temperatura: ${diagnosis.temperature} C°`, 35, position());
      pdfFile.text(`Presion: ${diagnosis.pressure} mmHg`, 35, position());

      if (diagnosis.dynamicData) {
        diagnosis.dynamicData.forEach((elem) => {
          pdfFile.text(`${[elem.key]}: ${elem.value}`, 35, position());
        });
      }
      position();
    });

    const fileName = `Historia_Clinica_${user.lastName}_${user.name}_al_${date}.pdf`;
    pdfFile.save(fileName);
  }


  private updatePosition(reset: boolean = false) {
    let position = 120;
    if(reset){
      position = 35
    }
    return () => (position += 15)
  }

}

const app = initializeApp(environment.firebaseConfig);
const db = getFirestore(app);
