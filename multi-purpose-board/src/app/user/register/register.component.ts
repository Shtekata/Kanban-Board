import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { emailValidator, rePasswordValidatorFactory } from 'src/app/shared/validators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../../../assets/css/form-styles.css']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;
  morm: FormGroup;

  isLoading = false;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {

    const passwordControl = this.fb.control('12345', [Validators.required, Validators.minLength(5)], []);

    this.form = this.fb.group({
      username: ['shtekata', [Validators.required, Validators.minLength(5)], []],
      email: ['gesheval@gmail.com', [Validators.required, emailValidator], []],
      tel: ['887658529', [], []],
      password: passwordControl,
      rePassword: ['12345', [Validators.required, Validators.minLength(5), rePasswordValidatorFactory(passwordControl)], []]
    });
  }

  ngOnInit(): void {
  }

  submitHandler(): void {
    this.isLoading = true;
    const data = this.form.value;
    this.userService.register(data).subscribe(x => {
      this.isLoading = false;
      this.router.navigate(['/']);
    }, (err) => { this.isLoading = false; console.log(err.message); });
  }
}
