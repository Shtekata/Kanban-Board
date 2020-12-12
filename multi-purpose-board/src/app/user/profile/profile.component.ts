import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth.service';
import { IUser } from 'src/app/shared/interfaces';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  inEditMode = false;
  isLoading = false;
  localUserStr = localStorage.getItem('user');
  localUser = this.localUserStr != null ? JSON.parse(this.localUserStr) : null;
  userWithUsernameAndTel: IUser = {
    displayName: '',
    email: this.localUser.email,
    alternateEmail: '',
    phoneNumber: '',
    password: '',
    address: '',
    photoURL: ''
  };

  constructor(private authService: AuthService, private userService: UserService) {
    this.loadProfile();
  }

  ngOnInit(): void {
  }

  toggleEditMode(): void {
    this.inEditMode = !this.inEditMode;
  }

  submitHandler(data: any): void {
    this.isLoading = true;
    this.userService.edit(this.localUser.uid, data).then(x => {
      this.isLoading = false;
      this.inEditMode = false;
    }, (err) => { this.isLoading = false; console.log(err.message); });
  }

 loadProfile(): void {
    this.authService.loadProfile().pipe(
      map((x: any) => {
          return <any>{
            id: x.payload.id,
            ...(x.payload.data() as object)
          };
      }),
      tap((x: any) => {
        this.userWithUsernameAndTel.phoneNumber = x.phoneNumber; 
        this.userWithUsernameAndTel.displayName = x.displayName; 
        this.userWithUsernameAndTel.alternateEmail = x.alternateEmail; 
        this.userWithUsernameAndTel.address = x.address; 
        this.userWithUsernameAndTel.photoURL = x.photoURL; 
      })).subscribe();
  }
} 
