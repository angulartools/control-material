import { Component, EventEmitter, forwardRef, Input, Output, ChangeDetectionStrategy } from '@angular/core';
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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library, IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';

@Component({
    selector: 'lib-control-material-select',
    templateUrl: './control-material-select.component.html',
    styleUrls: ['../control-material.component.scss', './control-material-select.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { '[id]': 'id' },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ControlMaterialSelectComponent),
            multi: true
        },
    ],
    imports: [
      MatIconButton, MatHint, MatOption, MatSelect, MatFormField, MatLabel, MatPrefix, MatSuffix, MatError, MatInput, NgClass, MatIcon, MatTooltip, FormsModule, ReactiveFormsModule, TranslationPipe, FontAwesomeModule
    ]
})
export class ControlMaterialSelectComponent extends ControlMaterialComponent {

  override id = `lib-control-material-select-${ControlMaterialSelectComponent.nextId++}`;

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

  // Expor helpers para o template
  getInfoIcon = getInfoIcon;
  getXmarkIcon = getXmarkIcon;

  // Resolve nested properties using dot notation (e.g., "data.nome")
  // Falls back gracefully if any segment is missing.
  resolvePath(source: any, path: string | null | undefined): any {
    if (!source || !path) return undefined;
    if (path.indexOf('.') === -1) {
      return source[path];
    }
    try {
      return path.split('.').reduce((acc: any, key: string) => (acc == null ? undefined : acc[key]), source);
    } catch {
      return undefined;
    }
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

// FontAwesome helpers (fallback Pro → Free)
export function hasFaIcon(prefix: IconPrefix, name: IconName): boolean {
  try {
    // @ts-ignore accessing runtime registry is intentional
    return !!(library as any)?.definitions?.[prefix]?.[name];
  } catch {
    return false;
  }
}

export function getInfoIcon(): [IconPrefix, IconName] {
  return hasFaIcon('fal', 'circle-info') ? ['fal', 'circle-info'] : ['fas', 'circle-info'];
}

export function getXmarkIcon(): [IconPrefix, IconName] {
  // Prefer Regular (Pro) if available, otherwise Solid (Free)
  return hasFaIcon('far', 'xmark') ? ['far', 'xmark'] : ['fas', 'xmark'];
}
