import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlMaterialComponent } from '../control-material.component';
import { MatError, MatFormField, MatHint, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatOption, MatSelect } from '@angular/material/select';
import { TranslationPipe } from '@angulartoolsdr/translation';
import { MatIconButton } from '@angular/material/button';
import { FontAwesomeSharedModule } from '../font-awesome.module';

@Component({
    selector: 'lib-control-material-select',
    templateUrl: './control-material-select.component.html',
    styleUrls: ['../control-material.component.scss', './control-material-select.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ControlMaterialSelectComponent),
            multi: true
        },
    ],
    imports: [
      MatIconButton, MatHint, MatOption, MatSelect, MatFormField, MatLabel, MatPrefix, MatSuffix, MatError, MatInput, NgClass, MatIcon, MatTooltip, FormsModule, ReactiveFormsModule, TranslationPipe,
      FontAwesomeSharedModule
    ]
})
export class ControlMaterialSelectComponent extends ControlMaterialComponent {

  @Input() multiple = false;
  @Input() bindId = 'id';
  @Input() bindLabel = 'nome';
  @Input() bindArray = [];
  @Input() disableClear = false;
  @Input() imageBefore = null;
  @Input() largeData = true;
  @Input() hint = null;

  @Input('translateData')
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


  @Output() clearItem: EventEmitter<any> = new EventEmitter();
  @Output() selectItem: EventEmitter<any> = new EventEmitter();

  _selectList = [];
  translateValue = false;

  constructor() {
    super();
    this.id = `lib-control-material-select-${ControlMaterialComponent.nextId++}`;
  }

  compareFn(v1: any, v2: any): boolean {
    if (this.bindId !== undefined) {
      return v1 && v2 ? v1[this.bindId] === v2[this.bindId] : v1 === v2;
    } else {
      if (v1['codigo'] !== undefined) {
        // temporario por problema de binding
        return v1 && v2 ? v1['codigo'] === v2['codigo'] : v1 === v2;
      } else  if (v1['id'] !== undefined) {
        return v1 && v2 ? v1['id'] === v2['id'] : v1 === v2;
      } else {
        return v1 && v2 ? v1 === v2 : false;
      }
    }
  }

  selectionChange($event: any) {
    this.selectItem.emit($event);
  }

  limparItem($event: any) {
    if (this.control.value !== undefined && this.control.value !== null && this.control.value !== '') {
      $event.stopPropagation();
      this.control.setValue(null);
      this.clearItem.emit();
    }
  }

}
