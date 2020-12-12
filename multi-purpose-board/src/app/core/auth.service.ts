import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

  get isLogged(): boolean { return !!this.user; }

  get storageUser(): any { return localStorage.getItem('user'); }
  user: any = this.storageUser !== null ? JSON.parse(this.storageUser) : null; 
 

  constructor(private firebaseAuth: AngularFireAuth, private db: AngularFirestore, private http: HttpClient) { 
    this.firebaseAuth.onAuthStateChanged(x => this.user = x);
  }

  async login(data: any): Promise<any>{
    await this.firebaseAuth.signInWithEmailAndPassword(data.email, data.password)
      .then((x: any) => { localStorage.setItem('user', JSON.stringify(x.user)); });
  }

  async register(data: any): Promise<any>{
    await this.firebaseAuth.createUserWithEmailAndPassword(data.email, data.password)
      .then(x => {
        localStorage.setItem('user', JSON.stringify(x.user));
        return this.db.collection('users').doc(x.user?.uid).set({
          displayName: data.displayName,
          phoneNumber: data.phoneNumber
        })
      });
  }

  logout(): any {
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
  }

  loadProfile(): any {
    return this.db.collection('users').doc(this.user.uid).snapshotChanges();
  }
}
