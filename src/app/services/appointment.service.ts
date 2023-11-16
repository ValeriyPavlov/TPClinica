import { Injectable } from '@angular/core';
import { FirebaseStoreProvider } from '../providers/firebase_store.provider';
import { Turno } from '../entities/Appointment';
import { collection, getFirestore, onSnapshot, query } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  public appointments: Turno[] = [];
  constructor(private readonly firebaseStoreProvider: FirebaseStoreProvider) {}

  public getAllAppointments() {
    return this.firebaseStoreProvider.getCollection('turnos');
  }

  public async getAppointments(){
    const q = query(collection(db, "turnos"));
    onSnapshot(q, (col) => {
      this.appointments = [];
      col.forEach(async (doc) =>{
        var appointment = doc.data() as Turno;
        this.appointments.push({...appointment});
      });
      return this.appointments;
    });
  }

  public saveAppointmentWithIdInStore(id: string, appointment: Turno) {
    return this.firebaseStoreProvider.setDocWithId('turnos', id, JSON.parse(JSON.stringify(appointment)));
  }

  public saveAppointmenInStore(appointment: Turno) {
    const doc = this.firebaseStoreProvider.createDoc('turnos');
    appointment.id = doc.id;
    return this.firebaseStoreProvider.saveDoc(doc, JSON.parse(JSON.stringify(appointment)));
  }
}

const app = initializeApp(environment.firebaseConfig);
const db = getFirestore(app);
