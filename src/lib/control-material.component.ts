import { AfterContentInit, AfterViewChecked, ChangeDetectorRef, Component, ContentChild, EventEmitter, forwardRef, HostBinding, inject, Input, Output } from '@angular/core';
import { FormControlName, FormsModule, NG_VALUE_ACCESSOR, NgModel, UntypedFormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatFormField, MatLabel, MatPrefix, MatSuffix, MatError } from '@angular/material/form-field';
import { NgClass } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { AutofocusDirective } from './auto-focus.directive';

@Component({
  selector: 'lib-control-material',
  templateUrl: './control-material.component.html',
  styleUrls: ['./control-material.component.scss'],
  standalone: true,
  providers: [
    {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ControlMaterialComponent),
        multi: true
    },
  ],
  imports: [AutofocusDirective, MatFormField, MatLabel, MatPrefix, MatSuffix, MatError, MatInput, NgClass, MatIcon, MatTooltip, FormsModule, ReactiveFormsModule]
})
export class ControlMaterialComponent implements AfterViewChecked, AfterContentInit {

  static nextId = 0;

  @Input() invisible = false;
  @Input() label: string | undefined;
  @Input() placeholder: string = '';
  @Input() formControl: UntypedFormControl | undefined;
  @Input() smaller = false;
  @Input() iconBefore = null;
  @Input() iconAfter = null;
  @Input() readonly = false;
  @Input() tooltip = null;
  @Input() inicialFocus = false;

  @Input() obrigatorio = false;

  @Input() disabled = false;
  @Input('disabled')
  set setDisabled(value: boolean) {
    if (this.control !== undefined) {
      if (this.control.disabled && !value) {
        this.control.enable({onlySelf: true});
      } else if (!this.control.disabled && value) {
        this.control.disable({onlySelf: true});
      }
    }
  }

  required = false;
  input: any;
  control: any;
  onChange: any = () => {};

  @ContentChild(FormControlName) formControlName: FormControlName | undefined;
  @ContentChild(NgModel) model: NgModel | undefined;

  index = ControlMaterialComponent.nextId;
  @HostBinding() id = `lib-control-material-${ControlMaterialComponent.nextId++}`;

  changeDetectorRef = inject(ChangeDetectorRef);
  translate = inject(TranslateService);

  @Output() onBlur: EventEmitter<any> = new EventEmitter();
  

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  ngAfterContentInit(): void {
    if (this.formControlName === undefined && this.model === undefined && this.formControl === undefined) {
      throw new Error(
        this.translate.instant('CONTROL_NGMODEL_FORMCONTROLNAME_ERROR')
      );
    }

    this.input = this.formControlName || this.model;

    if (this.formControlName !== undefined) {
      this.control = this.formControlName.control;
    }

    if (this.model !== undefined) {
      this.control = this.model.control;
    }

    if (this.formControl !== undefined) {
      this.control = this.formControl;
    }

    if (this.control.validator !== null) {
      const _validator: any = this.control.validator('');
      this.required = _validator && _validator.required;
    }

    this.label = this.label !== undefined && this.label !== null ? (this.label + ' ') : undefined;

    let validadores = [];
    let updateValidator = false;

    if (this.obrigatorio) {
      this.required = true;
      updateValidator = true;
      validadores.push(Validators.required)
    }

    if (updateValidator) {
      this.control.setValidators(validadores);
      this.control.updateValueAndValidity();
    }

    if (this.control !== undefined && this.disabled) {
      this.control.disable({onlySelf: true});
    }

  }

  blur() {
    this.onBlur.emit(this.control.value);
  }

  hasError(): boolean {
    return (
      this.control.invalid &&
      (this.control.dirty ||
        this.control.touched ||
        (this.formControlName !== undefined && this.input.formDirective.submitted)
      )
    );
  }

  public get errorMessage(): string | null {
    if (this.hasError()) {
      return this.getErrorMessage();
    }
    return null;
  }

  private getErrorMessage(): string | null {
    if (this.control.errors.required) {
      return this.translate.instant('CONTROL_CAMPO_OBRIGATORIO');
    } else if (this.control.errors.minlength) {
      return this.translate.instant('CONTROL_MINIMO_CARACTERES', {numero: this.control.errors.minlength.requiredLength});
    } else if (this.control.errors.maxlength) {
      return this.translate.instant('CONTROL_MAXIMO_CARACTERES', {numero: this.control.errors.maxlength.requiredLength});
    } else if (this.control.errors.min) {
      return this.translate.instant('CONTROL_VALOR_MINIMO', {numero: this.control.errors.min.min});
    } else if (this.control.errors.max) {
      return this.translate.instant('CONTROL_VALOR_MAXIMO', {numero: this.control.errors.max.max});
    } else if (this.control.errors.email) {
      return this.translate.instant('CONTROL_EMAIL_INVALIDO');
    } else if (this.control.errors.valueControlInvalid) {
      return this.translate.instant('CONTROL_VALOR_INVALIDO');
    } else if (this.control.errors.cpfInvalido) {
      return this.translate.instant('CONTROL_CPF_INVALIDO');
    } else if (this.control.errors.cnpjInvalido) {
      return this.translate.instant('CONTROL_CNPJ_INVALIDO');
    } else if (this.control.errors.ipInvalido) {
      return this.translate.instant('CONTROL_IP_INVALIDO');
    } else if (this.control.errors.phoneInvalido) {
      return this.translate.instant('CONTROL_PHONE_INVALIDO');
    } else if (this.control.errors.invalidName) {
      return this.translate.instant('CONTROL_NOME_JA_EXISTE');
    } else if (this.control.errors.invalidColor) {
      return this.translate.instant('COR_INVALIDA');
    }
    return null;
  }

  // GlobalUtil
  getDateUTC(data: Date) {
    const dateWithNoTimezone = new Date(
      data.getUTCFullYear(),
      data.getUTCMonth(),
      data.getUTCDate(),
      data.getUTCHours(),
      data.getUTCMinutes(),
      data.getUTCSeconds()
    );
    return dateWithNoTimezone;
  }

  writeValue(value) {
    if (value !== undefined && value !== null) {
      if (this.control !== undefined &&
          this.control.value !== value) {
        this.control.setValue(value);        
      }
    }
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

}
