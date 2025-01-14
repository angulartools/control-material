import { ControlMaterialComponent } from './../control-material.component';
import { Component, forwardRef } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';

@Component({
    selector: 'lib-control-material-filter',
    templateUrl: './control-material-filter.component.html',
    styleUrls: ['../control-material.component.scss', './control-material-filter.component.scss'],
    animations: [
        trigger('filterAppeared', [
            state('false', style({ opacity: 0, width: '0px', transform: 'translateX(100%)' })),
            /*state('true', style({opacity: 1, width: '100%', transform: 'translateX(0)'})),*/
            transition('false => true', [
                style({ opacity: 1, width: '100%' }),
                animate('300ms 0s ease-in', style({ transform: 'translateX(0)' }))
            ]),
            transition('true => false', [
                animate('300ms 0s ease-out', style({ transform: 'translateX(100%)' }))
            ])
        ])
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ControlMaterialFilterComponent), // replace name as appropriate
            multi: true
        }
    ],
    imports: [MatFormField, MatLabel, MatInput, FormsModule, ReactiveFormsModule, MatIconButton, MatSuffix, MatIcon]
})
export class ControlMaterialFilterComponent extends ControlMaterialComponent {

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
