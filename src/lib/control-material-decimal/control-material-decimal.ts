import { Component, forwardRef, Input, ChangeDetectionStrategy, AfterContentInit, ChangeDetectorRef, DoCheck } from '@angular/core';
import { ControlMaterialComponent } from '../control-material.component';
import { MatError, MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatTooltip } from '@angular/material/tooltip';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { formatNumber, formatCurrency, getCurrencySymbol } from '@angular/common';

@Component({
  selector: 'lib-control-material-decimal',
  templateUrl: './control-material-decimal.html',
  styleUrls: ['../control-material.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[id]': 'id' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ControlMaterialDecimal),
      multi: true
    },
  ],
  imports: [
    MatFormField, MatLabel, MatSuffix, MatError, MatInput, MatTooltip, FormsModule, ReactiveFormsModule, FontAwesomeModule
  ]
})
export class ControlMaterialDecimal extends ControlMaterialComponent implements AfterContentInit, DoCheck {

  override id = `lib-control-material-decimal-${ControlMaterialComponent.nextId++}`;

  @Input() decimalPlaces = 2;
  @Input() currencyCode?: string;
  @Input() externalError?: string | null;

  displayValue = '';
  private rawValue = 0;
  private lastControlValue: any;

  override ngAfterContentInit(): void {
    super.ngAfterContentInit();
    this.displayValue = this.format(this.rawValue);
  }

  ngDoCheck(): void {
    // Check if the control value has changed externally (e.g. from database without emitEvent)
    if (this.control && this.control.value !== this.lastControlValue) {

      // Update our internal state
      this.lastControlValue = this.control.value;

      // If the values are effectively different (accounting for number/string parsing), verify before updating display
      const factor = Math.pow(10, this.decimalPlaces);
      const incomingRaw = this.control.value ? Math.round(this.control.value * factor) : 0;

      if (incomingRaw !== this.rawValue) {
        this.writeValue(this.control.value);
      }
    }
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;

    // Extract only digits
    const digits = input.value.replace(/\D/g, '');
    this.rawValue = digits ? Number(digits) : 0;

    // Format for display
    const formatted = this.format(this.rawValue);
    this.displayValue = formatted;

    // Fix: If the calculated format is same as displayValue but input.value is different (e.g. empty after Cut),
    // Angular change detection won't update the DOM. We must force it manually.
    if (input.value !== formatted) {
      input.value = formatted;
      // Cursor adjustment could be needed here but for right-to-left fill usually end is fine
    }

    // Calculate numeric value to send to backend
    const factor = Math.pow(10, this.decimalPlaces);
    const numericValue = this.rawValue / factor;

    // Update control with numeric value
    this.control.setValue(numericValue, { emitEvent: true });
    this.lastControlValue = numericValue; // Sync lastControlValue purely to avoid loop in ngDoCheck
    this.onChange(numericValue);

    // Force view update
    this.changeDetectorRef.detectChanges()
  }

  onKeyDown(event: KeyboardEvent): void {
    // Prevent backspace/delete when value is already zero
    if ((event.key === 'Backspace' || event.key === 'Delete') && this.rawValue === 0) {
      event.preventDefault();
      return;
    }

    // Prevent Space key
    if (event.key === ' ') {
      event.preventDefault();
    }
  }

  private format(value: number): string {
    const factor = Math.pow(10, this.decimalPlaces);

    // Avoid manual string construction to prevent errors with small remainders (e.g. 3 becoming 0.3 instead of 0.03)
    const numero = value / factor;

    if (this.currencyCode) {
      return formatCurrency(
        numero,
        this.translate.currentLang,
        getCurrencySymbol(this.currencyCode, 'wide', this.translate.currentLang),
        this.currencyCode,
        `1.${this.decimalPlaces}-${this.decimalPlaces}`
      );
    }

    return formatNumber(numero, this.translate.currentLang, `1.${this.decimalPlaces}-${this.decimalPlaces}`);
  }

  override writeValue(value: number): void {
    if (value === undefined || value === null || isNaN(value)) {
      this.rawValue = 0;
      this.displayValue = this.format(0);
      if (this.changeDetectorRef) {
        this.changeDetectorRef.detectChanges();
      }
      return;
    }

    const factor = Math.pow(10, this.decimalPlaces);
    this.rawValue = Math.round(value * factor);
    this.displayValue = this.format(this.rawValue);
    if (this.changeDetectorRef) {
      this.changeDetectorRef.detectChanges();
    }
  }

  override blur() {
    this.onTouched();

    // garante sincronização com o FormControl
    if (this.control && !this.control.touched) {
      this.control.markAsTouched();
    }

    super.blur();
  }

}
