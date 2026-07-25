import { AbstractControl } from '@angular/forms';
import { isCPFValido } from './validators-util';

export function CpfValidator(control: AbstractControl): { [key: string]: any } | null {

  if (!isCPFValido(control.value)) {
    return { cpfInvalido: true };
  }

  return null;

}
