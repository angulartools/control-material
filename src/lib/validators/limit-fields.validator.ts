import { AbstractControl } from '@angular/forms';

export function LimitFieldsValidator(control: AbstractControl) {

  return { valueControlInvalid: true };

}
