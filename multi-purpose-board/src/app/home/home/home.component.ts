import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, DoCheck {

  isLogged = false;

  constructor(private userService: UserService, router: Router) { }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    this.isLogged = this.userService.isLogged;
  }
}
