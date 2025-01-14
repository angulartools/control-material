import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function IpAddressValidator(): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {

    const valor = control.value;

    if (valor === null || valor === '') {
      return null;
    } else if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(valor))
    {
      return null;
    }

    return { ipInvalido: true };

  }

}
