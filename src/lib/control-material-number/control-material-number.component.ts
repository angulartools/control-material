import { Component, Input } from '@angular/core';
import { ControlMaterialComponent } from '../control-material.component';
import { MatError, MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lib-control-material-number',
  standalone: true,
  templateUrl: './control-material-number.component.html',
  styleUrls: ['../control-material.component.scss', './control-material-number.component.scss'],
  imports: [MatFormField, MatLabel, MatPrefix, MatSuffix, MatError, MatInput, NgClass, MatIcon, MatTooltip, FormsModule, ReactiveFormsModule],
})
export class ControlMaterialNumberComponent extends ControlMaterialComponent {

  @Input() integer: boolean = false;

  constructor() {
    super();
    this.id = `lib-control-material-number-${ControlMaterialComponent.nextId++}`;
  }

  changeNumber(event: any){
    if (this.integer) {
      this.control.setValue(parseInt(event.target.value));
    }
    this.onBlur.emit(this.control.value);
  }

}
