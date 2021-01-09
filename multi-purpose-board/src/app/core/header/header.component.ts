import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  @ViewChild('load') load: any;

  hideNavigation = false;

  currentUser$ = this.authService.currentUser$;
  isLogged$ = this.authService.isLogged$;
  photoUrl$ = this.authService.photoUrl$;

  constructor(
    private authService: AuthService, private router: Router, title: Title) { 
  }

  ngOnInit(): void {
  }
  
  ngAfterViewInit(): void {
    if (this.load) { this.authService.loadProfile(); };
  }

  logoutHandler(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
