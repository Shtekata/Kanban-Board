import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IUser } from '../shared/interfaces';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class AuthService {

  currentUser: IUser | null;

  // get isLogged(): boolean { return !!this.currentUser; }
  get isLogged(): boolean { return !!this.user; }

  get storageUser(): any { return localStorage.getItem('user'); }
  get user(): any { return this.storageUser !== null ? JSON.parse(this.storageUser) : null; }

  constructor(private firebaseAuth: AngularFireAuth, private http: HttpClient) { }

  async login(data: any): Promise<any>{
    await this.firebaseAuth.signInWithEmailAndPassword(data.email, data.password)
      .then((x: any) => { this.currentUser = x; localStorage.setItem('user', JSON.stringify(x.user)); });
  }

  async register(data: any): Promise<any>{
    await this.firebaseAuth.createUserWithEmailAndPassword(data.email, data.password)
      .then((x: any) => { this.currentUser = x; localStorage.setItem('user', JSON.stringify(x.user)); });
  }

  logout(): any {
    this.firebaseAuth.signOut();
    this.currentUser = null;
    localStorage.removeItem('user');
  }

  authenticate(): Observable<any>{
    return this.http.get(`/users/profile`).pipe(
      tap((x: any) => this.currentUser = x),
      catchError(x => { this.currentUser = null; return of(null); })
    );
  }
}
