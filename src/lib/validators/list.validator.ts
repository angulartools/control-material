import { AbstractControl } from '@angular/forms';

export function ListValidator(control: AbstractControl) {

  const valor = control.value;

  if (valor === null || valor === '' || valor === undefined || valor.length === 0) {
    return { required: true };
  }

  return null;

}
