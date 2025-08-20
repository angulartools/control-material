import { ControlMaterialComponent } from './../control-material.component';
import { Component, AfterContentInit, Input, forwardRef } from '@angular/core';
import { TranslationPipe } from '@angulartoolsdr/translation';
import { MatIcon } from '@angular/material/icon';
import { NgxColorsModule } from 'ngx-colors';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel, MatSuffix, MatError } from '@angular/material/form-field';
import { FontAwesomeSharedModule } from '../font-awesome.module';

@Component({
    selector: 'lib-control-material-color-picker',
    templateUrl: './control-material-color-picker.component.html',
    styleUrls: ['../control-material.component.scss', './control-material-color-picker.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ControlMaterialColorPickerComponent),
            multi: true
        },
    ],
    imports: [
      MatFormField, MatLabel, MatInput, FormsModule, ReactiveFormsModule, NgxColorsModule, MatSuffix, MatIcon, MatError, TranslationPipe,
      FontAwesomeSharedModule
    ]
})
export class ControlMaterialColorPickerComponent extends ControlMaterialComponent implements AfterContentInit {

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
