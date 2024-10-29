import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlMaterialComponent } from '../control-material.component';
import { MatError, MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioGroup, MatRadioButton } from '@angular/material/radio';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'lib-control-material-radio',
  standalone: true,
  templateUrl: './control-material-radio.component.html',
  styleUrls: ['../control-material.component.scss', './control-material-radio.component.scss'],
  imports: [TranslateModule, MatRadioGroup, MatRadioButton, MatFormField, MatLabel, MatPrefix, MatSuffix, MatError, MatInput, NgClass, MatIcon, MatTooltip, FormsModule, ReactiveFormsModule],
})
export class ControlMaterialRadioComponent extends ControlMaterialComponent {

  @Input() inlineRadioLabel = false;
  @Input() bindId = 'id';
  @Input() bindLabel = 'nome';

  @Input('translate')
  set setTranslate(value: boolean) {
    this.translateValue = value;
  }

  @Input('selectList')
  set selectList(value: any) {
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

  constructor() {
    super();
    this.id = `lib-control-material-radio-${ControlMaterialComponent.nextId++}`;
  }

  radioSelectChange($event) {
    this.selectItem.emit($event);
  }

}
