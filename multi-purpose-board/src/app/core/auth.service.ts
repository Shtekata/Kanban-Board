import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, first, map, tap } from 'rxjs/operators';
import { IRootState } from '../+store';
import { authenticate, login, logout, register, update, updateUserAddressInfo, updateUserAlternateEmailInfo, updateUserDisplayNameInfo, updateUserPhoneNumberInfo, updateUserPhotoUrlInfo } from '../+store/actions';
import { IUser } from '../shared/interfaces';

@Injectable()
export class AuthService {

  currentUser$ = this.store.select(x => x.auth.currentUser);
  photoUrl$ = this.store.select(x => x.auth.photoUrl);
  isLogged$ = this.currentUser$.pipe(map(x => x !== null));
  currentUser: IUser | null | undefined;
  
  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private http: HttpClient,
    private store: Store<IRootState>
    ) { 
      // this.auth.onAuthStateChanged((x: any) => this.store.dispatch(authenticate({  user: {
      //       uid: x.uid,
      //       email: x.email,
      //       refreshToken: x.refreshToken
      //     } })));
    this.currentUser$.subscribe(x => this.currentUser = x);
  }

  async login(data: any): Promise<any>{
    await this.auth.signInWithEmailAndPassword(data.email, data.password)
      .then((x: any) => { this.store.dispatch(login({  user: {
          uid: x.user.uid,
          email: x.user.email,
          refreshToken: x.user.refreshToken
        } })) });
  }

  async register(data: any): Promise<any>{
    await this.auth.createUserWithEmailAndPassword(data.email, data.password)
      .then((x: any) => {
        this.store.dispatch(register({  user: {
          uid: x.user.uid,
          email: x.user.email,
          refreshToken: x.user.refreshToken
        }}));
        this.store.dispatch(updateUserPhoneNumberInfo({ phoneNumber: data.phoneNumber }));
        this.store.dispatch(updateUserDisplayNameInfo({ displayName: data.displayName }));
        return this.db.collection('users').doc(x.user?.uid).set({
          phoneNumber: data.phoneNumber,
          displayName: data.displayName
        })
      });
  }

  logout(): any {
    this.auth.signOut();
    this.store.dispatch(logout());
  }

  loadProfile(): any {
   return this.db.collection('users').doc(this.currentUser?.uid).snapshotChanges().pipe(
      map((x: any) => {
          return <any>{
            id: x?.payload?.id,
            ...(x?.payload?.data() as object)
          };
      }),
      tap((x: any) => {
        if (x?.phoneNumber) { this.store.dispatch(updateUserPhoneNumberInfo({ phoneNumber: x?.phoneNumber })) }; 
        if (x?.displayName) { this.store.dispatch(updateUserDisplayNameInfo({ displayName: x?.displayName })) }; 
        if (x?.alternateEmail) { this.store.dispatch(updateUserAlternateEmailInfo({ alternateEmail: x?.alternateEmail })) }; 
        if (x?.address) { this.store.dispatch(updateUserAddressInfo({ address: x?.address })) }; 
        if (x?.photoUrl) { this.store.dispatch(updateUserPhotoUrlInfo({ photoUrl: x?.photoUrl })) }; 
      }),first()).subscribe();
  };

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
