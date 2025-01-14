import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function LimitFieldsValidator(): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {

    return { valueControlInvalid: true };

  }

}
