import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function ListLengthValidator(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as unknown[];

    if (!Array.isArray(value)) {
      return { invalidType: true };
    }

    if (min != null && value?.length < min) {
      return { min: { required: min, actual: value?.length } };
    }

    if (max != null && value?.length > max) {
      return { max: { required: max, actual: value?.length } };
    }

    return null;
  };
}