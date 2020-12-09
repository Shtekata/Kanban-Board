import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { EmailValidatorDirective } from './email-validator.directive';
import { ShortFormatTextPipe } from './short-format-text.pipe';

const dataDeclExp = [LoaderComponent, EmailValidatorDirective, ShortFormatTextPipe];

@NgModule({
  declarations: dataDeclExp,
  imports: [CommonModule],
  exports: dataDeclExp
})
export class SharedModule { }
