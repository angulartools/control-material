import { Component, forwardRef, Input, ChangeDetectionStrategy } from '@angular/core';
import { ControlMaterialComponent } from '../control-material.component';
import { MatError, MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'lib-control-material-textarea',
    templateUrl: './control-material-textarea.component.html',
    styleUrls: ['../control-material.component.scss', './control-material-textarea.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { '[id]': 'id' },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ControlMaterialTextareaComponent),
            multi: true
        },
    ],
    imports: [
      MatFormField, MatLabel, MatPrefix, MatSuffix, MatError, MatInput, NgClass, MatIcon, MatTooltip, FormsModule, ReactiveFormsModule
    ]
})
export class ControlMaterialTextareaComponent extends ControlMaterialComponent {

  override id = `lib-control-material-textarea-${ControlMaterialTextareaComponent.nextId++}`;

  @Input() rows = 5;

}
