import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { IUser } from 'src/app/shared/interfaces';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  get currentUser(): IUser | null {
    return this.authService.currentUser;
  }
  inEditMode = false;
  isLoading = false;

  constructor(private authService: AuthService, private userService: UserService) {}

  ngOnInit(): void {
  }

  toggleEditMode(): void{
    this.inEditMode = !this.inEditMode;
  }

  submitHandler(data: any): void{
    this.isLoading = true;
    this.userService.edit(data).subscribe(x => {
      this.isLoading = false;
      this.inEditMode = false;
    }, (err) => { this.isLoading = false; console.log(err.message); });
  }
}
