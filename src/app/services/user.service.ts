import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAuthProvider } from '../providers/firebase_auth.provider';
import { FirebaseStoreProvider } from '../providers/firebase_store.provider';
import { FirebaseStorageProvider } from '../providers/firebase_storage.provider';
import { User } from '../entities/User';
import { Especialista } from '../entities/Specialist';
import { collection, getFirestore, onSnapshot, query } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environments';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public users: any[] = [];

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
}

const app = initializeApp(environment.firebaseConfig);
const db = getFirestore(app);
