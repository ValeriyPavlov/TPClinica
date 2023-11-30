import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, setDoc, doc, DocumentReference, DocumentData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})

export class FirebaseStoreProvider {
  
  constructor(private readonly firestore: Firestore) {}

  public getCollection(col: string) {
    return collectionData(collection(this.firestore, col));
  }

  public saveDoc(doc: DocumentReference<DocumentData>, data: any) {
    return setDoc(doc, data);
  }

  public setDocWithId(col: string, id: any, data: any) {
    return setDoc(doc(this.firestore, col, id), data);
  }

  public createDoc(col: string) {
    return doc(collection(this.firestore, col));
  }
}
