import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { emailValidator, rePasswordValidatorFactory } from 'src/app/shared/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  isLoading = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {

    const passwordControl = this.fb.control('111111', [Validators.required, Validators.minLength(5)], []);

    this.form = this.fb.group({
      displayName: ['shtekata', [Validators.required, Validators.minLength(6)], []],
      email: ['gesheval@gmail.com', [Validators.required, emailValidator], []],
      phoneNumber: ['887658529', [], []],
      password: passwordControl,
      rePassword: ['111111', [Validators.required, Validators.minLength(6), rePasswordValidatorFactory(passwordControl)], []]
    });
  }

  ngOnInit(): void {
  }

  async submitHandler(): Promise<any> {
    this.isLoading = true;
    const data = this.form.value;
    await this.authService.register(data).then(x => {
      this.isLoading = false;
      this.router.navigate(['/']);
    }, (err) => { this.isLoading = false; this.errorMessage = err.message; });
  }
}
