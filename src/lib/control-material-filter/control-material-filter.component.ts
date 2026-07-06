import { ControlMaterialComponent } from './../control-material.component';
import { Component, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'lib-control-material-filter',
  templateUrl: './control-material-filter.component.html',
  styleUrls: ['../control-material.component.scss', './control-material-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[id]': 'id' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ControlMaterialFilterComponent), // replace name as appropriate
      multi: true
    }
  ],
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    FormsModule,
    ReactiveFormsModule,
    MatSuffix,
    MatIcon,
    MatIconButton, FontAwesomeModule
  ]
})
export class ControlMaterialFilterComponent extends ControlMaterialComponent {

  override id = `lib-control-material-filter-${ControlMaterialFilterComponent.nextId++}`;

  showFilterInput = false;

  get value() {
    return this.control.value;
  }

  set value(val) {
    this.control.setValue(val);

    this.onChange(val);
    this.onTouched();
  }


}
