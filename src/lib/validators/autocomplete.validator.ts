import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function AutocompleteValidator(): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {

    const valor = control.value;

    if (valor === null || valor === undefined || valor === '') {
      return null;
    } else if (!valor.hasOwnProperty('id')) {
      return { valueControlInvalid: true };
    }

    return null;

  }

}
