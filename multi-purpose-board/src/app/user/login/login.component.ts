import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../../assets/css/form-styles.css']
})
export class LoginComponent implements OnInit {

  isLoading = false;
  errorMessage = '';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  submitFormHandler(data: { email: string, password: string }): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.userService.login(data).subscribe(x => {
      this.isLoading = false;
      this.router.navigate(['/']);
    }, (err) => {
        this.errorMessage = 'ERROR!';
        this.isLoading = false;
    });
  }
}
