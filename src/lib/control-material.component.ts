import { AfterContentInit, AfterViewChecked, ChangeDetectorRef, Component, ContentChild, EventEmitter, forwardRef, ChangeDetectionStrategy, inject, Input, Output } from '@angular/core';
import { FormControlName, FormsModule, NG_VALUE_ACCESSOR, NgModel, UntypedFormControl, ReactiveFormsModule, Validators, ControlValueAccessor } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatFormField, MatLabel, MatPrefix, MatSuffix, MatError, MatFormFieldAppearance } from '@angular/material/form-field';
import { NgClass } from '@angular/common';
import { TranslationService } from '@angulartoolsdr/translation';
import { AutofocusDirective } from './auto-focus.directive';
import { FontAwesomeService } from './fontawesome.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library, IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { faXmark as faXmarkPro } from '@fortawesome/pro-solid-svg-icons';
import { faXmark as faXmarkFree } from '@fortawesome/free-solid-svg-icons';
import { faCircleInfo as faCircleInfoPro } from '@fortawesome/pro-solid-svg-icons';
import { faCircleInfo as faCircleInfoFree } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'lib-control-material',
    templateUrl: './control-material.component.html',
    styleUrls: ['./control-material.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { '[id]': 'id' },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ControlMaterialComponent),
            multi: true
        },
    ],
    imports: [
      AutofocusDirective, 
      MatFormField, 
      MatLabel, 
      MatPrefix, 
      MatSuffix, 
      MatError, 
      MatInput, 
      NgClass, 
      MatIcon, 
      MatTooltip, 
      FormsModule, 
      ReactiveFormsModule,
      FontAwesomeModule
    ]
})
export class ControlMaterialComponent implements AfterViewChecked, AfterContentInit, ControlValueAccessor {

  private _ = inject(FontAwesomeService);

  protected static nextId = 0;
  index = ControlMaterialComponent.nextId;
  id = `lib-control-material-${ControlMaterialComponent.nextId++}`;

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
  @Input() appearance: MatFormFieldAppearance = 'outline';

  @Input() obrigatorio = false;

  @Input('disabled')
  set setDisabled(value: boolean) {
    this._disabled = value;
    if (this.control !== undefined) {
      if (this.control.disabled && !value) {
        this.control.enable({onlySelf: true});
      } else if (!this.control.disabled && value) {
        this.control.disable({onlySelf: true});
      }
    }
  }
  _disabled = false;

  required = false;
  input: any;
  control: any;
  onChange: any = () => {};
  onTouched: any = () => {};

  @ContentChild(FormControlName) formControlName: FormControlName | undefined;
  @ContentChild(NgModel) model: NgModel | undefined;

  changeDetectorRef = inject(ChangeDetectorRef);
  translate = inject(TranslationService);

  @Output() onBlur: EventEmitter<any> = new EventEmitter();

  // Expor helpers para o template
  getInfoIcon = getInfoIcon;
  getXmarkIcon = getXmarkIcon;

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
      const value = this.model.model;
      this.control = this.model.control;
      this.control.setValue(value);
    }

    if (this.formControl !== undefined) {
      this.control = this.formControl;
    }

    if (this.control.validator !== null) {
      const _validator: any = this.control.validator('');
      this.required = _validator && _validator.required;
    }

    this.label = this.label !== undefined && this.label !== null ? (this.label + ' ') : undefined;

    let validadores: any[] = [];
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

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  get disabled() {
    return this._disabled;
  }

}

// FontAwesome helpers (fallback Pro → Free)
export function hasFaIcon(prefix: IconPrefix, name: IconName): boolean {
  try {
    // @ts-ignore accessing runtime registry is intentional
    return !!(library as any)?.definitions?.[prefix]?.[name];
  } catch {
    return false;
  }
}

export function getInfoIcon() {
  return icon(faCircleInfoPro) ? faCircleInfoPro : faCircleInfoFree;
}

export function getXmarkIcon() {
  return icon(faXmarkPro) ? faXmarkPro : faXmarkFree;
}