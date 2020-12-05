import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { emailValidator } from './validators';

@Directive({
  selector: '[ngModel] [appEmailValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: EmailValidatorDirective
    }
  ]
})
export class EmailValidatorDirective implements Validator {

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    return emailValidator(control);
  }
}
