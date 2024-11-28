import { AbstractControl } from '@angular/forms';
import { ValidatorsUtil } from './validators-util';

export function CnpjValidator(control: AbstractControl<any, any>): { [key: string]: boolean } | null {

  if (control.value !== null && control.value !== '' && !ValidatorsUtil.isCNPJValido(control.value)) {
    return { cnpjInvalido: true };
  }

  return null;

}
