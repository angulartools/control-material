import { AfterContentInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlMaterialComponent } from '../control-material.component';
import { MatError, MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { DatePipe, NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { IMaskDirective } from 'angular-imask';

@Component({
  selector: 'lib-control-material-phone',
  standalone: true,
  templateUrl: './control-material-phone.component.html',
  styleUrls: ['../control-material.component.scss', './control-material-phone.component.scss'],
  imports: [IMaskDirective, MatIconButton, DatePipe, MatFormField, MatLabel, MatPrefix, MatSuffix, MatError, MatInput, NgClass, MatIcon, MatTooltip, FormsModule, ReactiveFormsModule],
})
export class ControlMaterialPhoneComponent extends ControlMaterialComponent implements AfterContentInit {

  @Input() disableClear = false;
  @Input() unmask = true;

  telephoneMask = {
    mask: '+000',
    lazy: false,
    placeholderChar: ' ',
    overwrite: true
  }
  countries = getCountries();

  constructor() {
    super();
    this.id = `lib-control-material-phone-${ControlMaterialComponent.nextId++}`;
  }

}
