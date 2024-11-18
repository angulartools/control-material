import { AbstractControl } from '@angular/forms';
import { ValidatorsUtil } from './validators-util';

export function CpfValidator(control: AbstractControl): { [key: string]: boolean } | null {

  if (!ValidatorsUtil.isCPFValido(control.value)) {
    return { cpfInvalido: true };
  }

  return null;

}
