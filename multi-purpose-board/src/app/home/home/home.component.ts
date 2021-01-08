import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, DoCheck {

  // isLogged = false;
  isLogged$ = this.authService.isLogged$;

  constructor(private authService: AuthService, router: Router) { }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    // this.isLogged = this.authService.isLogged;
  }
}
