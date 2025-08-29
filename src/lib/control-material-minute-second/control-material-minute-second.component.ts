import { AfterContentInit, Component, EventEmitter, forwardRef, Input, Output, ChangeDetectionStrategy } from "@angular/core";
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { MatError, MatFormField, MatLabel, MatSuffix } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { MatTooltip } from "@angular/material/tooltip";
import { IMaskDirective } from "angular-imask";
import { ControlMaterialComponent } from './../control-material.component';
import { FontAwesomeSharedModule } from '../font-awesome.module';

@Component({
    selector: 'lib-control-material-minute-second',
    templateUrl: './control-material-minute-second.component.html',
    styleUrls: ['../control-material.component.scss', './control-material-minute-second.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { '[id]': 'id' },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ControlMaterialMinuteSecondComponent), // replace name as appropriate
            multi: true
        }
    ],
    imports: [
      MatFormField, 
      MatLabel, 
      MatInput, 
      FormsModule, 
      IMaskDirective, 
      ReactiveFormsModule, 
      MatError, 
      MatIcon, 
      MatTooltip, 
      MatSuffix,
      FontAwesomeSharedModule
    ]
})
export class ControlMaterialMinuteSecondComponent extends ControlMaterialComponent implements AfterContentInit {

  override id = `lib-control-material-minute-second-${ControlMaterialMinuteSecondComponent.nextId++}`;

  @Input() showTime = true;
  inputHour = '';
  hourMinuteMask = {
    mask: '00:00:00',
    lazy: false,
    placeholderChar: ' '
  };

  @Output() selectDate: EventEmitter<any> = new EventEmitter();

  override ngAfterContentInit() {
    super.ngAfterContentInit();

    if (this.control !== undefined && this.control !== null) {

      if (this.control.value !== undefined && this.control.value !== null && !isNaN(this.control.value)) {
        this.preencherMinuto(this.control.value);
      }

      this.control.valueChanges.subscribe(val => {
        if (val === null || val === undefined) {
          this.inputHour = Object.assign('', '');
        }
      });

    }

  }


   onFocus(event) {
    setTimeout(() => {
      event.target.setSelectionRange(0, event.target.value?.length);
    });
   }

   onFocusOutMinute(event) {
    const aMinuto = event.target?.value?.split(':');
    let hora = Number(aMinuto[0].trim());
    let minuto = Number(aMinuto[1].trim());
    let segundo = Number(aMinuto[2].trim());

    this.validarDataHora((hora * 3600) + (minuto * 60) + segundo);

   }

   preencherMinuto(value) {
    let hora = 0;
    let minuto = 0;

    if (value >= 3600) {
      hora = Math.floor((value/3600));
    }

    if (value >= 60) {
      minuto = Math.round((value % 3600) / 60);
      minuto = minuto === 60 ? 59 : minuto;
    }
    const segundo = (value % 3600) % 60;

    let sHora = hora < 10 ? ('0' + hora) : hora.toString();
    let sMinuto = minuto < 10 ? ('0' + minuto) : minuto.toString();
    let sSegundo = segundo < 10 ? ('0' + segundo) : segundo.toString();

    this.inputHour = '';
    setTimeout(() => {
      this.inputHour = sHora + ':' + sMinuto + ':' + sSegundo;
    });
   }


   validarDataHora(data) {
    if (data > 359999) {
      data = 359999;
    }
    this.preencherMinuto(data);
    this.control.setValue(null, {emitEvent: false});
    this.control.setValue(data.toString(), {emitEvent: false});
    this.selectDate.emit(data);
    return true;
   }

}
