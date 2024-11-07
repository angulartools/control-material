import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlMaterialComponent } from '../control-material.component';
import { MatError, MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { IMaskDirective } from 'angular-imask';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'lib-control-material-masked',
  standalone: true,
  templateUrl: './control-material-masked.component.html',
  styleUrls: ['../control-material.component.scss', './control-material-masked.component.scss'],
  providers: [
    {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ControlMaterialMaskedComponent), // replace name as appropriate
        multi: true
    }
  ],
  imports: [MatIconButton, MatFormField, MatLabel, MatPrefix, MatSuffix, MatError, MatInput, NgClass, MatIcon, MatTooltip, FormsModule, ReactiveFormsModule, IMaskDirective],
})
export class ControlMaterialMaskedComponent extends ControlMaterialComponent {

  @Input() mask = '';
  @Input() showClearMask = false;
  @Input() unmask = true;

  @Output() clearItem: EventEmitter<any> = new EventEmitter();

  constructor() {
    super();
    this.id = `lib-control-material-masked-${ControlMaterialComponent.nextId++}`;
  }

  limparItem($event: any) {
    if (this.control.value !== undefined && this.control.value !== null && this.control.value !== '') {
      $event.stopPropagation();
      this.control.setValue('');
      this.clearItem.emit();
    }
  }

}
