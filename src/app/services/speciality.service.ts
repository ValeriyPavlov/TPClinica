import { Injectable } from '@angular/core';
import { FirebaseStoreProvider } from '../providers/firebase_store.provider';
import { FirebaseStorageProvider } from '../providers/firebase_storage.provider';
import { Especialidad } from '../entities/Speciality';
import { firstValueFrom } from 'rxjs';
import { collection, getFirestore, onSnapshot, query } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})

export class SpecialityService {

  public specialitys: Especialidad[];
  constructor(private readonly firebaseStoreProvider: FirebaseStoreProvider, private readonly firebaseStorageProvider: FirebaseStorageProvider) {
    this.specialitys = [];
  }

  public async getAllSpecialities() {
    let specialities = (await firstValueFrom(this.firebaseStoreProvider.getCollection('specialities'))) as Especialidad[];
    specialities = await Promise.all(specialities.map(async (speciality) => {
        return {...speciality, image: await this.getSpecialityPhoto(speciality)};
      }));
    return specialities;
  }

  public async getSpecialities(){
    const q = query(collection(db, "specialities"));
    onSnapshot(q, (col) => {
      this.specialitys = [];
      col.forEach(async (doc) =>{
        var spec = doc.data() as Especialidad;
        this.specialitys.push({...spec, image: await this.getSpecialityPhoto(spec)});
      });
      return this.specialitys;
    });
  }


  public async addSpeciality(speciality: Especialidad){
    let exists = false;
    const currentSpecs = await this.getAllSpecialities();
    currentSpecs.forEach(spec => {
      if(spec.description == speciality.description)
      {
        exists = true;
      }
    });
    if(!exists)
    {
      const doc = this.firebaseStoreProvider.createDoc('specialities');
      return this.firebaseStoreProvider.saveDoc(doc, JSON.parse(JSON.stringify(speciality)));
    }
  }


  public async getSpecialityPhoto(speciality: Especialidad) {
    try {
      const reference = this.firebaseStorageProvider.referenceCloudStorage(speciality.image!);
      const url = await this.firebaseStorageProvider.getUrlFromFile(reference);
      return url;
    } 
    catch (error) {
      
    }
    return undefined;
  }
}


const app = initializeApp(environment.firebaseConfig);
const db = getFirestore(app);