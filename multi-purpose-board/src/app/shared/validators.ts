import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function emailValidator(control: AbstractControl): ValidationErrors | null {
    const value = (control.value as string);
    if (!value) { return null; }
    const isValidEmail = /^[a-zA-Z][a-zA-Z0-9\.-]{5,}@gmail.(com|bg)$/.test(value);
    return isValidEmail ? null : { regexNotMatch: true };
}

export function rePasswordValidatorFactory(targetControl: AbstractControl): ValidatorFn {
    return function rePasswordValidator(control: AbstractControl): ValidationErrors | null {
        const areTheSame = targetControl.value === control.value || !control.value;
        return areTheSame ? null : { rePasswordValidator: true };
    };
}
