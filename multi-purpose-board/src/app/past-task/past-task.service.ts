import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../shared/interfaces';
import { AngularFirestore, DocumentChangeAction, DocumentReference, DocumentSnapshot, DocumentSnapshotExists, QuerySnapshot } from '@angular/fire/firestore';

@Injectable()
export class PastTaskService {

  constructor(private db: AngularFirestore, private http: HttpClient) { }

  loadTaskList(): Observable<DocumentChangeAction<unknown>[]> {
    return this.db.collection('old', x => x.orderBy('title', 'asc')).snapshotChanges();
  }

  loadTaskList2(): Observable<unknown[]> {
    return this.db.collection('old').valueChanges();
  }

  loadTask(id: string): Observable<DocumentChangeAction<unknown>[]> {
    return this.db.collection('old', x => x.where('id', '==', id)).snapshotChanges();
  }

  addTask(data: IUser): Promise<DocumentReference<unknown>> {
    return this.db.collection('old').add(data);
  }

  updateTask(id: string, data: IUser): Promise<void> {
    return this.db.doc(`old/${id}`).update(data);
  }

  deleteTask(id: string): Promise<void> {
    return this.db.doc(`old/${id}`).delete();
  }

}
