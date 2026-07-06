import { ControlMaterialComponent } from '../control-material.component';
import { Component, AfterContentInit, DoCheck, forwardRef, ChangeDetectionStrategy, input, signal } from '@angular/core';
import { ChromeWrapper } from './chrome-wrapper/chrome-wrapper';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel, MatSuffix, MatError } from '@angular/material/form-field';
import { MatTooltip } from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'lib-control-material-color-picker',
  templateUrl: './control-material-color-picker.component.html',
  styleUrls: ['../control-material.component.scss', './control-material-color-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[id]': 'id' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ControlMaterialColorPickerComponent),
      multi: true
    },
  ],
  imports: [
    MatFormField, MatLabel, MatTooltip, MatInput, FormsModule, ReactiveFormsModule, ChromeWrapper, MatSuffix, MatError, FontAwesomeModule
  ]
})
export class ControlMaterialColorPickerComponent extends ControlMaterialComponent implements AfterContentInit, DoCheck {

  override id = `lib-control-material-color-picker-${ControlMaterialColorPickerComponent.nextId++}`;

  format = input('hex');
  hideTextInput = input(false);
  colorsAnimation = input<'popup' | 'slide-in'>('popup');
  colorPickerControls = input<'default' | 'only-alpha' | 'no-alpha'>('default');

  selectedColor = signal<any>(undefined);

  override ngAfterContentInit() {
    super.ngAfterContentInit();
    this.syncSelectedColor();
  }

  ngDoCheck(): void {
    this.syncSelectedColor();
  }

  updateControlValue(valor) {
    this.control.setValue(valor);
    this.selectedColor.set(valor);
  }

  changeColor(event) {
    if (!this.readonly) {
      this.control.setValue(event)
      this.selectedColor.set(event);
    }
  }

  private syncSelectedColor(): void {
    if (this.control !== undefined && this.selectedColor() !== this.control.value) {
      this.selectedColor.set(this.control.value);
      this.changeDetectorRef.markForCheck();
    }
  }

}
