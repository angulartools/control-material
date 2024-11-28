import { AbstractControl } from '@angular/forms';

export function LimitFieldsValidator(control: AbstractControl<any, any>): { [key: string]: boolean } | null {

  return { valueControlInvalid: true };

}
