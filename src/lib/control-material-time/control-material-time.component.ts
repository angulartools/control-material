import { AfterContentInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlMaterialComponent } from '../control-material.component';
import { MatError, MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { DatePipe, NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'lib-control-material-time',
  standalone: true,
  templateUrl: './control-material-time.component.html',
  styleUrls: ['../control-material.component.scss', './control-material-time.component.scss'],
  imports: [MatIconButton, DatePipe, MatFormField, MatLabel, MatPrefix, MatSuffix, MatError, MatInput, NgClass, MatIcon, MatTooltip, FormsModule, ReactiveFormsModule],
})
export class ControlMaterialTimeComponent extends ControlMaterialComponent implements AfterContentInit {

  @Input() minDate = null;
  @Input() maxDate = null;

  @Output() selectDate: EventEmitter<any> = new EventEmitter();

  constructor() {
    super();
    this.id = `lib-control-material-time-${ControlMaterialComponent.nextId++}`;
  }

  override ngAfterContentInit(): void {
    super.ngAfterContentInit();

    this.control.valueChanges.subscribe(val => {
      //console.log(val);
      if (val !== undefined && val !== null) {
        this.changeDate(val);
      }
    });

  }

  dateInputChanged($event): any {
    let value;

    if ($event !== undefined) {
      if ($event instanceof Date) {
        value = $event;
      }else if (typeof $event === 'string' && $event !== '' ) {
        const date = new Date($event);
        value = date;
      } else if ($event.value !== undefined && typeof $event.value === 'string' && $event.value !== '') {
        const date = new Date($event.value);
        value = date;
      } else if ($event.target.valueAsDate !== undefined && $event.target.valueAsDate !== null && $event.valueAsDate !== '') {
        value = this.getDateUTC($event.target.valueAsDate);
      } else if ($event.target.value !== undefined && $event.target.value !== null && $event.target.value !== '' ) {
        const date = new Date($event.target.value);
        value = date;
      }
    }

    return value;
  }

  changeNgModelDate($event) {
    const value = this.dateInputChanged($event);

    if (this.isValidDate(value)) {
      if (this.model !== undefined) {
        this.control.value = value;
        this.control.setValue(value);
      } else {
        this.control.setValue(value);
      }
      this.selectDate.emit(value);
    }
  }

  changeDate($event) {
    const value = this.dateInputChanged($event);
    this.selectDate.emit(value);

    if (this.isValidDate(value)) {
      if (this.model !== undefined) {
        this.control.value = value;
      } else {
        this.control.setValue(value, {emitEvent: false});
      }
    }
  }

  isValidDate(date) {
    return date instanceof Date && date !== undefined && date !== null;
  }

  showPicker() {
    const inputDateElement = document.getElementById(this.id) as any;
    inputDateElement.showPicker();
  }

}
