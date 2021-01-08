import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { EmailValidatorDirective } from './email-validator.directive';
import { ShortFormatTextPipe } from './pipes/short-format-text.pipe';
import { ShortText339998Pipe } from './pipes/short-text-339998.pipe';
import { ShortTextTitlePipe } from './pipes/short-text-title.pipe';

const dataDeclExp = [
  LoaderComponent,
  EmailValidatorDirective,
  ShortFormatTextPipe,
  ShortTextTitlePipe,
  ShortText339998Pipe,
];

@NgModule({
  declarations: dataDeclExp,
  imports: [CommonModule],
  exports: dataDeclExp
})
export class SharedModule { }
