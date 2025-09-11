import { ControlMaterialComponent } from './../control-material.component';
import { Component, AfterContentInit, Input, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { TranslationPipe } from '@angulartoolsdr/translation';
import { MatIcon } from '@angular/material/icon';
import { NgxColorsModule } from 'ngx-colors';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel, MatSuffix, MatError } from '@angular/material/form-field';
import { MatTooltip } from '@angular/material/tooltip';

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
      MatFormField, MatLabel, MatTooltip, MatInput, FormsModule, ReactiveFormsModule, NgxColorsModule, MatSuffix, MatIcon, MatError, TranslationPipe
    ]
})
export class ControlMaterialColorPickerComponent extends ControlMaterialComponent implements AfterContentInit {

  override id = `lib-control-material-color-picker-${ControlMaterialColorPickerComponent.nextId++}`;

  @Input() format = 'hex';
  @Input() hideTextInput = false;
  @Input() colorsAnimation = 'popup' as 'popup' | 'slide-in';
  @Input() colorPickerControls = 'default' as 'default' | 'only-alpha' | 'no-alpha';

   override ngAfterContentInit() {
     super.ngAfterContentInit();
   }

   updateControlValue(valor) {
    this.control.value = valor;
    this.control.setValue(valor);
   }

   changeColor(event) {
    if (!this.readonly) {
      this.control.setValue(event)
    }
   }

}
