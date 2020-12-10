import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { EmailValidatorDirective } from './email-validator.directive';
import { ShortFormatTextPipe } from './pipes/short-format-text.pipe';
import { ShortText339998Pipe } from './pipes/short-text-339998.pipe';
import { ShortText3399982Pipe } from './pipes/short-text-339998-2.pipe';
import { ShortTextTitlePipe } from './pipes/short-text-title.pipe';
import { ShortText3399983Pipe } from './pipes/short-text-339998-3.pipe';
import { ShortText3399984Pipe } from './pipes/short-text-339998-4.pipe';
import { ShortText3399985Pipe } from './pipes/short-text-339998-5.pipe';

const dataDeclExp = [
  LoaderComponent,
  EmailValidatorDirective,
  ShortFormatTextPipe,
  ShortTextTitlePipe,
  ShortText339998Pipe,
  ShortText3399982Pipe,
  ShortText3399983Pipe,
  ShortText3399984Pipe,
  ShortText3399985Pipe
];

@NgModule({
  declarations: dataDeclExp,
  imports: [CommonModule],
  exports: dataDeclExp
})
export class SharedModule { }
