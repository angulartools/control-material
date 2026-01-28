import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import currencyCodes from 'currency-codes';

export function CurrencyValidator(): ValidatorFn { 
	
	return (control: AbstractControl): ValidationErrors | null => {
		
		const value = control.value;

		if (value == null || value === '') {
			return null; // campo opcional
		}

		const normalized = String(value).trim().toUpperCase();

		return !!currencyCodes.code((normalized)) ? null : {
			invalidCurrency: {
				actual: normalized,
			},
		};

	};

}
