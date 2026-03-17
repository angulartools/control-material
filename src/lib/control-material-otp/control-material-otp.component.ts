import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren, ElementRef, forwardRef, ChangeDetectionStrategy, ChangeDetectorRef, inject, } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, } from '@angular/forms';

@Component({
  selector: 'lib-control-material-otp',
  templateUrl: './control-material-otp.component.html',
  styleUrls: ['./control-material-otp.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ControlMaterialOtpComponent),
      multi: true,
    },
  ]
})
export class ControlMaterialOtpComponent implements ControlValueAccessor, OnInit {

  private static nextId = 0;
  id = `lib-control-material-otp-${ControlMaterialOtpComponent.nextId++}`;

  /** Número de dígitos do código OTP */
  @Input() length = 6;

  /** Se true, aceita apenas dígitos numéricos */
  @Input() onlyNumbers = true;

  /** Se true, o campo exibe os caracteres como senha (●) */
  @Input() secret = false;

  /** Desabilita todos os campos */
  @Input() disabled = false;

  /** Desabilita todos os campos */
  @Input() readonly = false;

  /** Se true, os campos serão menores */
  @Input() smaller = false;

  /** Emite o valor completo quando todos os campos estão preenchidos */
  @Output() completed = new EventEmitter<string>();

  @ViewChildren('digitInput') digitInputs!: QueryList<ElementRef<HTMLInputElement>>;

  digits: string[] = [];
  private _value = '';
  private onChange: (value: string) => void = () => { };
  private onTouched: () => void = () => { };

  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.digits = Array(this.length).fill('');
  }

  // ControlValueAccessor
  writeValue(value: string): void {
    const str = value ?? '';
    this.digits = Array(this.length)
      .fill('')
      .map((_, i) => str[i] ?? '');
    this._value = str;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  onInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    if (this.onlyNumbers) {
      value = value.replace(/\D/g, '');
    }

    // Pega apenas o último caractere digitado
    value = value.slice(-1);
    this.digits[index] = value;
    input.value = value;

    this._emitValue();

    if (value && index < this.length - 1) {
      this._focusNext(index);
    }
  }

  onKeydown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Backspace') {
      if (!this.digits[index] && index > 0) {
        this.digits[index - 1] = '';
        this._emitValue();
        this._focusPrev(index);
        event.preventDefault();
      } else {
        this.digits[index] = '';
        this._emitValue();
      }
    } else if (event.key === 'ArrowLeft' && index > 0) {
      this._focusPrev(index);
      event.preventDefault();
    } else if (event.key === 'ArrowRight' && index < this.length - 1) {
      this._focusNext(index);
      event.preventDefault();
    }
  }

  onPaste(event: ClipboardEvent, startIndex: number): void {
    event.preventDefault();
    let paste = event.clipboardData?.getData('text') ?? '';
    if (this.onlyNumbers) {
      paste = paste.replace(/\D/g, '');
    }
    paste = paste.slice(0, this.length - startIndex);
    paste.split('').forEach((char, i) => {
      if (startIndex + i < this.length) {
        this.digits[startIndex + i] = char;
      }
    });
    this._emitValue();
    const nextFocus = Math.min(startIndex + paste.length, this.length - 1);
    setTimeout(() => this._focusAt(nextFocus));
  }

  onFocus(index: number): void {
    const inputs = this.digitInputs?.toArray();
    if (inputs?.[index]) {
      inputs[index].nativeElement.select();
    }
    this.onTouched();
  }

  trackByIndex(index: number): number {
    return index;
  }

  private _emitValue(): void {
    const value = this.digits.join('');
    this._value = value;
    this.onChange(value);
    if (value.length === this.length && !value.includes('')) {
      this.completed.emit(value);
    }
  }

  private _focusNext(index: number): void {
    setTimeout(() => this._focusAt(index + 1));
  }

  private _focusPrev(index: number): void {
    setTimeout(() => this._focusAt(index - 1));
  }

  private _focusAt(index: number): void {
    const inputs = this.digitInputs?.toArray();
    if (inputs?.[index]) {
      inputs[index].nativeElement.focus();
    }
  }
}
