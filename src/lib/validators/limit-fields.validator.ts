import { AbstractControl } from '@angular/forms';

export function LimitFieldsValidator(control: AbstractControl<any, any>): { [key: string]: any } | null {

  return { valueControlInvalid: true };

}
