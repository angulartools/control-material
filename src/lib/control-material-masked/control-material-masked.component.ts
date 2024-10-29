import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlMaterialComponent } from '../control-material.component';
import { MatError, MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IMaskDirective } from 'angular-imask';

@Component({
  selector: 'lib-control-material-masked',
  standalone: true,
  templateUrl: './control-material-masked.component.html',
  styleUrls: ['../control-material.component.scss', './control-material-masked.component.scss'],
  imports: [MatFormField, MatLabel, MatPrefix, MatSuffix, MatError, MatInput, NgClass, MatIcon, MatTooltip, FormsModule, ReactiveFormsModule, IMaskDirective],
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
      this.control.setValue(null);
      this.clearItem.emit();
    }
  }

}
