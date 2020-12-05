import { Injectable, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IUser } from '../shared/interfaces';
const apiUrl = environment.apiUrl;

@Injectable()
export class UserService implements OnDestroy {

  currentUser!: IUser | null;

  get isLogged(): boolean {
    return !!this.currentUser;
  }

   constructor(private http: HttpClient, private router: Router) { }

  getCurrentUserProfile(): Observable<any>{
    return this.http.get(`${apiUrl}/users/profile`, { withCredentials: true }).pipe(
      tap((x: any) => this.currentUser = x),
      catchError(x => of(null))
    );
  }

  // GET /users?email=email&password=12345&action=login
  login(data: any): Observable<any>{
    return this.http.post(`${apiUrl}/users/login`, data, { withCredentials: true })
    .pipe(tap((x: any) => this.currentUser = x));
  }

  register(data: any): Observable<any>{
    return this.http.post(`${apiUrl}/users/register`, data, { withCredentials: true })
      .pipe(tap((x: any) => this.currentUser = x));
  }

  logout(): Observable<any>{
    return this.http.post(`${apiUrl}/users/logout`, {}, { withCredentials: true })
      .pipe(
        tap(() => this.currentUser = null),
        catchError((x) => of(x)),
        tap(() => this.currentUser = null)
      );
  }

  edit(data: any): Observable<any>{
    return this.http.put(`${apiUrl}/users/profile`, data, { withCredentials: true })
      .pipe(tap((x: any) => this.currentUser = x));
  }

  ngOnDestroy(): void{}
}
