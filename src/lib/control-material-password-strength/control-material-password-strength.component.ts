import { Component } from '@angular/core';
import { ControlMaterialPasswordComponent } from '../control-material-password/control-material-password.component';
import { MatError, MatFormField, MatHint, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lib-control-material-password',
  standalone: true,
  templateUrl: './control-material-password-strength.component.html',
  styleUrls: ['../control-material.component.scss', './control-material-password-strength.component.scss'],
  imports: [MatFormField, MatLabel, MatPrefix, MatSuffix, MatError, MatInput, NgClass, MatIcon, MatTooltip, FormsModule, MatHint, ReactiveFormsModule],
})
export class ControlMaterialPasswordStrengthComponent extends ControlMaterialPasswordComponent {

  passwordPattern = new RegExp(/^(?!.*(.)\1{2})(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[a-z])(?=.*[A-Z]).{12,128}$/);

  constructor() {
    super();
    this.id = `lib-control-material-password-strength${ControlMaterialPasswordComponent.nextId++}`;
  }


}
