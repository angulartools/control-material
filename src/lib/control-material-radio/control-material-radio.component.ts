import { Component, EventEmitter, forwardRef, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { ControlMaterialComponent } from '../control-material.component';
import { MatError, MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatRadioGroup, MatRadioButton } from '@angular/material/radio';
import { TranslationPipe } from '@angulartoolsdr/translation';

@Component({
    selector: 'lib-control-material-radio',
    templateUrl: './control-material-radio.component.html',
    styleUrls: ['../control-material.component.scss', './control-material-radio.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { '[id]': 'id' },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ControlMaterialRadioComponent), // replace name as appropriate
            multi: true
        }
    ],
    imports: [
      TranslationPipe, MatRadioGroup, MatRadioButton, MatFormField, MatLabel, MatPrefix, MatSuffix, MatError, MatInput, NgClass, MatIcon, MatTooltip, FormsModule, ReactiveFormsModule
    ]
})
export class ControlMaterialRadioComponent extends ControlMaterialComponent {

  override id = `lib-control-material-radio-${ControlMaterialRadioComponent.nextId++}`;

  @Input() inlineRadioLabel = false;
  @Input() bindId = 'id';
  @Input() bindLabel = 'nome';

  @Input('translate')
  set setTranslate(value: boolean) {
    this.translateValue = value;
  }

  @Input('selectList')
  set setSelectList(value: any) {
    this._selectList = value;
    if (value !== undefined && value !== null && value.length > 0) {
      if (this.control !== undefined) {
        if (this.control.value !== null) {
          if (this.control.value instanceof Object ) {
            const index = value.findIndex(x => x[this.bindId] === this.control.value[this.bindId]);
            if (index > -1) {
              this.control.setValue(value[index]);
            }

          }
        }
      }
    }
  }

  @Output() selectItem: EventEmitter<any> = new EventEmitter();

  _selectList = [];
  translateValue = false;

  radioSelectChange($event) {
    this.selectItem.emit($event);
  }

}
