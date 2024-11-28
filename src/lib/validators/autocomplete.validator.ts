import { AbstractControl } from '@angular/forms';

export function AutocompleteValidator(control: AbstractControl<any, any>): { [key: string]: boolean } | null {

  const valor = control.value;

  if (valor === null || valor === undefined || valor === '') {
    return null;
  } else if (!valor.hasOwnProperty('id')) {
    return { valueControlInvalid: true };
  }

  return null;

}
