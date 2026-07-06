import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const SUPPORTED_CURRENCIES = new Set(
	Intl.supportedValuesOf('currency')
);

export function CurrencyValidator(): ValidatorFn {

	return (control: AbstractControl): ValidationErrors | null => {

		const value = control.value;

		if (value == null || value === '') {
			return null;
		}

		const normalized = String(value)
			.trim()
			.toUpperCase();

		return SUPPORTED_CURRENCIES.has(normalized)
			? null
			: {
				invalidCurrency: {
					actual: normalized,
				},
			};

	};

}
