import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { IUser } from 'src/app/shared/interfaces';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  hideNavigation = false;

  get isLogged(): boolean{
    return this.authService.isLogged;
  }

  get user(): IUser | null{
    // return this.authService.currentUser;
    return this.authService.user;
  }

  constructor(private authService: AuthService, private router: Router, title: Title) { }

  photoURL: string | null;

  ngOnInit(): void {
      this.loadProfile();

  }

  logoutHandler(): void {
    this.photoURL = null;
    this.authService.logout();
    this.router.navigate(['/']);
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
        this.photoURL = x.photoURL; 
      })).subscribe();
  }

}
