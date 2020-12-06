import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
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

  ngOnInit(): void {
  }

  logoutHandler(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
