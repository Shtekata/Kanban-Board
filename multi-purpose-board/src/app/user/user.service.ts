import { Injectable, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthService } from '../core/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { IUser } from '../shared/interfaces';

@Injectable()
export class UserService implements OnDestroy {

  user: any = this.authService.user;

  constructor(private authService: AuthService, private db: AngularFirestore) { }

    edit(uid: string, data: IUser): Promise<any>{
   return this.db.collection('users').doc(uid).update(data);
  }

  ngOnDestroy(): void{}
}
