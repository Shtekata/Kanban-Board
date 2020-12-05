import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { EmailValidatorDirective } from './email-validator.directive';

const dataDeclExp = [LoaderComponent, EmailValidatorDirective];

@NgModule({
  declarations: dataDeclExp,
  imports: [CommonModule],
  exports: dataDeclExp
})
export class SharedModule { }
