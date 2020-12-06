import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  async submitFormHandler(data: { email: string, password: string }): Promise<any> {
    this.isLoading = true;
    this.errorMessage = '';
    await this.authService.login(data).then(x => {
      this.isLoading = false;
      this.router.navigate(['/']);
    }, (err) => { this.isLoading = false; this.errorMessage = err.message;  });
  }
}
