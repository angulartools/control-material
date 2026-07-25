import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isCNPJValido } from './validators-util';

export function CnpjValidator(): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {

    if (control.value !== null && control.value !== '' && !isCNPJValido(control.value)) {
      return { cnpjInvalido: true };
    }

    return null;

  }

}
