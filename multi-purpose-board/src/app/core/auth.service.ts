import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, first, map, tap } from 'rxjs/operators';
import { IRootState } from '../+store';
import { authenticate, login, logout, register } from '../+store/actions';
import { IUser } from '../shared/interfaces';

@Injectable()
export class AuthService {

  // get isLogged(): boolean { return !!this.user; }

  // get storageUser(): any { return localStorage.getItem('user'); }
  // user: any = this.storageUser !== null ? JSON.parse(this.storageUser) : null; 

  currentUser$ = this.store.select(x => x.auth.currentUser);
  isLogged$ = this.currentUser$.pipe(map(x => x !== null));
  currentUser: IUser | null | undefined;

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private http: HttpClient,
    private store: Store<IRootState>
  ) { 
    this.authenticate();
    // this.auth.onAuthStateChanged((x: any) => this.store.dispatch(authenticate({  user: {
    //       uid: x.uid,
    //       email: x.email,
    //       refreshToken: x.refreshToken
    //     } })));
  }

  async login(data: any): Promise<any>{
    await this.auth.signInWithEmailAndPassword(data.email, data.password)
      // .then((x: any) => { localStorage.setItem('user', JSON.stringify(x.user)); });
      .then((x: any) => { this.store.dispatch(login({  user: {
          uid: x.user.uid,
          email: x.user.email,
          refreshToken: x.user.refreshToken
        } })) });
  }

  async register(data: any): Promise<any>{
    await this.auth.createUserWithEmailAndPassword(data.email, data.password)
      .then((x: any) => {
        // localStorage.setItem('user', JSON.stringify(x.user));
        this.store.dispatch(register({  user: {
          uid: x.user.uid,
          email: x.user.email,
          refreshToken: x.user.refreshToken
        } }));
        return this.db.collection('users').doc(x.user?.uid).set({
          displayName: data.displayName,
          phoneNumber: data.phoneNumber
        })
      });
  }

  logout(): any {
    this.auth.signOut();
    // localStorage.removeItem('user');
    this.store.dispatch(logout());
  }

  loadProfile(): any {
    this.currentUser$.subscribe(x => this.currentUser = x);
    return this.db.collection('users').doc(this.currentUser?.uid).snapshotChanges();
  }

  authenticate(): Observable<any>{
    return this.auth.authState.pipe(
      tap((x: any) => this.store.dispatch(authenticate({
        user: {
          uid: x.uid,
          email: x.email,
          refreshToken: x.refreshToken
        }
      }))),
      catchError(() => { this.store.dispatch(authenticate({ user: null })); return of(null); })
    );
  }
}
