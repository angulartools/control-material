import { AfterContentInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlMaterialComponent } from '../control-material.component';
import { MatError, MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { DatePipe, NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { IMaskDirective } from 'angular-imask';
import phoneExample from 'libphonenumber-js/mobile/examples'
import { debounceTime } from 'rxjs/operators';
import { getExampleNumber, getCountryCallingCode, getCountries } from 'libphonenumber-js'
import { NgxFlagPickerComponent } from '../ngx-flag-picker/ngx-flag-picker.component';

@Component({
  selector: 'lib-control-material-phone',
  standalone: true,
  templateUrl: './control-material-phone.component.html',
  styleUrls: ['../control-material.component.scss', './control-material-phone.component.scss'],
  imports: [NgxFlagPickerComponent, IMaskDirective, MatIconButton, DatePipe, MatFormField, MatLabel, MatPrefix, MatSuffix, MatError, MatInput, NgClass, MatIcon, MatTooltip, FormsModule, ReactiveFormsModule],
})
export class ControlMaterialPhoneComponent extends ControlMaterialComponent implements AfterContentInit {

  @Input() disableClear = false;
  @Input() unmask = true;
  @Input() selectedCountryCode;
  @Input() countryCodes = NgxFlagPickerComponent.getAllCountries();

  countryCallingCode;

  telephoneMask = {
    mask: '+000',
    lazy: false,
    placeholderChar: ' ',
    overwrite: true
  };

  countries = getCountries();

  @Output() clearItem: EventEmitter<any> = new EventEmitter();

  constructor() {
    super();
    this.id = `lib-control-material-phone-${ControlMaterialComponent.nextId++}`;
  }

  override ngAfterContentInit(): void {
    super.ngAfterContentInit();

    this.control.valueChanges.pipe(debounceTime(300)).subscribe(query => {
      if ((this.selectedCountryCode === null || this.selectedCountryCode === undefined) && query !== null && query !== undefined && query !== '') {
        const aQuery = query.split(' ');
        if (aQuery?.length > 1) {
          this.selectedCountryCode = aQuery[0];
          this.changeSelectedCountryCode(this.selectedCountryCode);
          setTimeout(() => {
            this.control.setValue(aQuery[1], {emitEvent: false});
          })
        } else {
          for (let i = 0; i<this.countries.length; i++){
            const country = getCountryCallingCode(this.countries[i]);
            if (query === country) {
              this.selectedCountryCode = this.countries[i].toLowerCase();
              this.changeSelectedCountryCode(this.selectedCountryCode);
              setTimeout(() => {
                if (aQuery?.length > 0) {
                  this.control.setValue(aQuery[1], {emitEvent: false});
                }
              })
              break;
            }
          }
        }
      }
    });
  }

  override blur() {
    this.onBlur.emit(this.selectedCountryCode);
  }

  changeSelectedCountryCode(value) {
    this.control.setValue('');
    this.selectedCountryCode = value;
    this.blur();
    this.setCountryCode(value);
    const input = document.getElementById('masktextfield' + this.index) as HTMLInputElement;
    const phoneNumber = getExampleNumber(value.toUpperCase(), phoneExample);
    this.countryCallingCode = phoneNumber?.countryCallingCode;
    setTimeout(() => {
      const position = ('+' + phoneNumber?.countryCallingCode + ' ').length + 1;
      if (input !== null) {
        input.setSelectionRange(position, position);
      }
    })
  }

  setCountryCode(value) {
    const phoneNumber = getExampleNumber(value.toUpperCase(), phoneExample);

    let numberNational = phoneNumber?.formatNational().toString();
    let splitNumber = numberNational?.split('');

    let novoFormato = '';
    for (let char in splitNumber) {
      if (splitNumber[char] === ' ' || isNaN(Number(splitNumber[char]))){
        novoFormato = novoFormato + splitNumber[char]
      } else {
        novoFormato = novoFormato + '0';
      }
    }
    if (phoneNumber?.countryCallingCode !== null && phoneNumber?.countryCallingCode !== undefined) {
      novoFormato = '+' + phoneNumber?.countryCallingCode + ' ' + novoFormato;
    } else {
      novoFormato = '+';
    }

    this.countryCallingCode = phoneNumber?.countryCallingCode;
    this.configPhoneMask(novoFormato);
  }

  configPhoneMask(masscara) {
    this.telephoneMask = {
      mask: masscara,
      lazy: false,
      placeholderChar: ' ',
      overwrite: true
    };
  }

  clearPhone($event) {
    $event.stopPropagation();
    this.control.setValue(' ', {emitEvent: false});
    this.selectedCountryCode = null;
    this.configPhoneMask('+000');
    const input = document.getElementById('masktextfield' + this.index) as HTMLInputElement;
    input.focus();
    setTimeout(() => {
      input.setSelectionRange(1, 1);
    })
    this.clearItem.emit();
  }

}
