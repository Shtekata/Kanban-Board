import { Injectable, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../core/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class UserService implements OnDestroy {

  constructor(private http: HttpClient, private authService: AuthService, private db: AngularFirestore) { }

    edit(data: any): Observable<any>{
    return of(this.authService.user);
  }

  ngOnDestroy(): void{}
}
