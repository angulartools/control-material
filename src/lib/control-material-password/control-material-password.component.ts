import { Component, Input } from '@angular/core';
import { ControlMaterialComponent } from '../control-material.component';
import { MatError, MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'lib-control-material-password',
  standalone: true,
  templateUrl: './control-material-password.component.html',
  styleUrls: ['../control-material.component.scss', './control-material-password.component.scss'],
  imports: [MatIconButton, MatFormField, MatLabel, MatPrefix, MatSuffix, MatError, MatInput, NgClass, MatIcon, MatTooltip, FormsModule, ReactiveFormsModule],
})
export class ControlMaterialPasswordComponent extends ControlMaterialComponent {

  hide = true;

  constructor() {
    super();
    this.id = `lib-control-material-password-${ControlMaterialComponent.nextId++}`;
  }


}
