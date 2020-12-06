import { Injectable, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../core/auth.service';

@Injectable()
export class UserService implements OnDestroy {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getCurrentUserProfile(): Observable<any>{
    return this.http.get(`/users/profile`).pipe(
      tap((x: any) => this.authService.currentUser = x));
  }

  edit(data: any): Observable<any>{
    return this.http.put(`/users/profile`, data)
      .pipe(tap((x: any) => this.authService.currentUser = x));
  }

  ngOnDestroy(): void{}
}
