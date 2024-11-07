import { Component, forwardRef, Input } from '@angular/core';
import { ControlMaterialComponent } from '../control-material.component';
import { MatError, MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lib-control-material-textarea',
  standalone: true,
  templateUrl: './control-material-textarea.component.html',
  styleUrls: ['../control-material.component.scss', './control-material-textarea.component.scss'],
  providers: [
    {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ControlMaterialTextareaComponent),
        multi: true
    },
  ],
  imports: [MatFormField, MatLabel, MatPrefix, MatSuffix, MatError, MatInput, NgClass, MatIcon, MatTooltip, FormsModule, ReactiveFormsModule],
})
export class ControlMaterialTextareaComponent extends ControlMaterialComponent {

  @Input() rows = 5;

  constructor() {
    super();
    this.id = `lib-control-material-textarea-${ControlMaterialComponent.nextId++}`;
  }


}
