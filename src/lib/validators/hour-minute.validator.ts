import { AbstractControl } from '@angular/forms';

export function HourMinuteValidator(control: AbstractControl) {

    // parte 1: de 00 a 23
    // parte 2: de 00 a 59

    const valor = control.value;

    if (valor && valor.trim().length === 5) {
        const hora: number = +valor.split(':')[0];
        const minuto: number = +valor.split(':')[1];

        if (hora < 0 || hora > 23) {
            return { campoInvalido: true };
        }

        if (minuto < 0 || minuto > 59) {
            return { campoInvalido: true };
        }
    } else {
        return { campoInvalido: true };
    }

    return null;
  }
