import { Component, forwardRef, Input, ChangeDetectionStrategy } from '@angular/core';
import { ControlMaterialComponent } from '../control-material.component';
import { MatError, MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatTooltip } from '@angular/material/tooltip';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'lib-control-material-number',
  templateUrl: './control-material-number.component.html',
  styleUrls: ['../control-material.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[id]': 'id' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ControlMaterialNumberComponent),
      multi: true
    },
  ],
  imports: [
    MatFormField,
    MatLabel,
    MatPrefix,
    MatSuffix,
    MatError,
    MatInput,
    MatTooltip,
    FormsModule,
    ReactiveFormsModule, FontAwesomeModule
  ]
})
export class ControlMaterialNumberComponent extends ControlMaterialComponent {

  override id = `lib-control-material-number-${ControlMaterialNumberComponent.nextId++}`;

  @Input() integer: boolean = false;
  @Input() permiteNumeroE: boolean = false;
  @Input() enforceMinMax: boolean = false;

  minNumber: number;
  maxNumber: number;

  override ngAfterContentInit(): void {
    super.ngAfterContentInit();

    const { min, max } = this.getMinMax(this.control);
    this.minNumber = min;
    this.maxNumber = max;

  }

  onKeyDown(event: KeyboardEvent) {
    // Permitir E / e apenas se configurado
    if ((event.key === 'e' || event.key === 'E') && !this.permiteNumeroE) {
      event.preventDefault();
    }
  }

  onKeyUp(event: KeyboardEvent) {

    if (this.enforceMinMax && event.currentTarget['valueAsNumber'] < this.minNumber) {
      this.control.setValue(Math.trunc(this.minNumber - 1));
      event.preventDefault();
    }

    if (this.enforceMinMax && event.currentTarget['valueAsNumber'] > this.maxNumber) {
      this.control.setValue(Math.trunc(this.maxNumber + 1));
      event.preventDefault();
    }

  }

  changeNumber(event: any) {

    if (this.enforceMinMax && event.target.valueAsNumber < this.minNumber) {
      this.control.setValue(Math.trunc(this.minNumber - 1));
    }

    if (this.enforceMinMax && event.target.valueAsNumber > this.maxNumber) {
      this.control.setValue(Math.trunc(this.maxNumber + 1));
    }

    if (this.integer) {
      this.control.setValue(parseInt(event.target.value));
    }
    this.onBlur.emit(this.control.value);
  }

}

