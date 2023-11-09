import { Injectable } from '@angular/core';
import { ref, Storage, StorageReference, uploadBytes, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})

export class FirebaseStorageProvider {

  constructor(private readonly storage: Storage) {}


  public referenceCloudStorage(fileName: string) {
    return ref(this.storage, fileName);
  }


  public uploadFile(reference: StorageReference, data: any) {
    return uploadBytes(reference, data);
  }
  
  
  public getUrlFromFile(reference: StorageReference) {
    return getDownloadURL(reference);
  }
}
