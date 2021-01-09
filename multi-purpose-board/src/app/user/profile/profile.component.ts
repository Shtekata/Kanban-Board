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
    uid: '',
    displayName: '',
    email: this.localUser.email,
    alternateEmail: '',
    phoneNumber: '',
    password: '',
    address: '',
    photoURL: ''
  };

  constructor(private authService: AuthService, private userService: UserService) {
    // this.loadProfile();
  }

  ngOnInit(): void {
  }

  toggleEditMode(): void {
    this.inEditMode = !this.inEditMode;
  }

  submitHandler(data: any): void {
    this.isLoading = true;
    if (
      this.userWithUsernameAndTel.phoneNumber ||
      this.userWithUsernameAndTel.displayName ||
      this.userWithUsernameAndTel.alternateEmail ||
      this.userWithUsernameAndTel.address ||
      this.userWithUsernameAndTel.photoURL) {
      this.userService.edit(this.localUser.uid, data).then(x => {
      this.isLoading = false;
      this.inEditMode = false;
    }, (err) => { this.isLoading = false; console.log(err.message); });
    } else {
      const newData: any = {};
      data.phoneNumber ? newData.phoneNumber = data.phoneNumber : null;
      data.displayName ? newData.displayName = data.displayName : null;
      data.alternateEmail ? newData.alternateEmail = data.alternateEmail : null;
      data.address ? newData.address = data.address : null;
      data.photoURL ? newData.photoURL = data.photoURL : null;
      this.userService.add(this.localUser.uid, newData).then(x => {
      this.isLoading = false;
      this.inEditMode = false;
    }, (err) => { this.isLoading = false; console.log(err.message); });  
       }
  }

//  loadProfile(): void {
//     this.authService.loadProfile().pipe(
//       map((x: any) => {
//           return <any>{
//             id: x.payload.id,
//             ...(x.payload.data() as object)
//           };
//       }),
//       tap((x: any) => {
//         this.userWithUsernameAndTel.phoneNumber = x.phoneNumber; 
//         this.userWithUsernameAndTel.displayName = x.displayName; 
//         this.userWithUsernameAndTel.alternateEmail = x.alternateEmail; 
//         this.userWithUsernameAndTel.address = x.address; 
//         this.userWithUsernameAndTel.photoURL = x.photoURL; 
//       })).subscribe();
//   }
} 
