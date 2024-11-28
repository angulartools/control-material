import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { isValidPhoneNumber } from 'libphonenumber-js'

export function PhoneNumberValidator (value: any): ValidatorFn {

  return (control: AbstractControl<any, any>): { [key: string]: boolean } | null => {

    const valor = control.value;

    if (value !== null && value !== undefined && value !== '') {
      if (valor !== undefined && valor !== null && valor !== '') {
        let code = value.toUpperCase();
        if (isValidPhoneNumber(valor, code)) {
          return null;
        }
        return { phoneInvalido: true };
      } else {
        return { phoneInvalido: true };
      }
    }

    return null;

  }
}
