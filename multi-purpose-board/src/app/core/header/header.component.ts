import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IUser } from 'src/app/shared/interfaces';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  hideNavigation = false;

  get isLogged(): boolean{
    return this.userService.isLogged;
  }

  get user(): IUser | null{
    return this.userService.currentUser;
  }

  constructor(private userService: UserService, private router: Router, title: Title) { }

  ngOnInit(): void {
  }

  logoutHandler(): void{
    this.userService.logout().subscribe(() => this.router.navigate(['/']));
  }

}
