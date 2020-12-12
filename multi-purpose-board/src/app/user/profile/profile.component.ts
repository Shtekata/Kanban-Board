import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  inEditMode = false;
  isLoading = false;
  localUser = localStorage.getItem('user');
  userWithUsernameAndTel = this.localUser != null ? JSON.parse(this.localUser) : null;

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
    this.userService.edit(data).subscribe(x => {
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
      })).subscribe();
  }
} 
