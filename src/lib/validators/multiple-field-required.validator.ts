import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function MultipleFieldRequiredValidator(fields: string[]): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const form = group as FormGroup;
    const values = fields.map(f => form.get(f)?.value?.toString().trim() ?? '');
    const filledCount = values.filter(v => !!v).length;

    if (filledCount > 0 && filledCount < fields.length) {
      setRequiredError(form, fields);
    } else {
      removeRequiredError(form, fields);
    }

    return null;
  };

  function setRequiredError(group: FormGroup, fields: string[]) {
    fields.forEach(field => {
      const control = group.get(field);
      if (control && !control.value?.toString().trim()) {
        control.setErrors({ ...(control.errors || {}), required: true });
      }
    });
  }

  function removeRequiredError(group: FormGroup, fields: string[]) {
    fields.forEach(field => {
      const control = group.get(field);
      if (control && control.errors?.['required']) {
        const { required, ...rest } = control.errors;
        control.setErrors(Object.keys(rest).length > 0 ? rest : null);
      }
    });
  }
}
