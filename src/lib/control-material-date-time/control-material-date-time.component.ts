import moment from 'moment';
import { AfterContentInit, Component, EventEmitter, HostBinding, Input, Output, forwardRef, inject } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMatDateAdapter, NgxMatDatetimePickerModule } from '@4sellers/angular-material-components-datetime-picker';
import { TranslateModule } from '@ngx-translate/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDatepickerToggle, MatDatepickerToggleIcon } from '@angular/material/datepicker';
import { IMaskDirective } from 'angular-imask';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel, MatSuffix, MatError } from '@angular/material/form-field';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
import 'moment/locale/pt';
import 'moment/locale/es';
import { ControlMaterialComponent } from './../control-material.component';
import { Mask } from '@angulartoolsdr/shared-utils';

@Component({
    selector: 'lib-control-material-date-time',
    templateUrl: './control-material-date-time.component.html',
    styleUrls: ['./control-material-date-time.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ControlMaterialDateTimeComponent), // replace name as appropriate
            multi: true
        },
        {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},

        // Moment can be provided globally to your app by adding `provideMomentDateAdapter`
        // to your app config. We provide it at the component level here, due to limitations
        // of our example generation script.
        provideMomentDateAdapter(),
    ],
    standalone: true,
    imports: [MatFormField, MatLabel, MatInput, NgxMatDatetimePickerModule, FormsModule, ReactiveFormsModule, IMaskDirective, MatDatepickerToggle, MatSuffix, MatIcon, MatDatepickerToggleIcon, MatButton, MatError, TranslateModule]
})
export class ControlMaterialDateTimeComponent extends ControlMaterialComponent implements AfterContentInit {

  @Input() showTime = true;
  @Input() enableMeridian = false;
  @Input() disableMinute = false;
  @Input() showSpinners = true;
  @Input() showSeconds = false;
  @Input() stepHour = 1;
  @Input() stepMinute = 1;
  @Input() stepSecond = 1;
  @Input() touchUi = false;
  @Input() minDate = null;
  @Input() maxDate = null;

  hourMinuteMask: Mask = Mask.getMaskHourMinute();

  LANG_EN = 'en-US';

  inputDate = '';
  inputHour = '';
  dateMask = Mask.getMaskDate();

  @HostBinding() override id = `lib-control-material-date-time-${ControlMaterialComponent.nextId++}`;
  private readonly _adapter = inject<NgxMatDateAdapter<unknown>>(NgxMatDateAdapter);

  @Output() selectDate: EventEmitter<any> = new EventEmitter();

  constructor() {
    super();
    this._adapter.setLocale(this.translate.currentLang);
  }

  override ngAfterContentInit() {
    super.ngAfterContentInit();

    if (this.control !== undefined && this.control !== null) {

      if (this.control.value !== undefined && this.control.value !== null) {
        this.preencherData(moment(this.control.value).toDate());
        this.preencherHora(moment(this.control.value).toDate());
      }

      this.control.valueChanges.subscribe(val => {
        if (val === null || val === undefined) {
          this.inputDate = this.inputHour = Object.assign('', '');
        } else {
          this.preencherData(moment(val).toDate());
          this.preencherHora(moment(val).toDate());
        }
      });

    }

    if (this.showTime) {
      // this._adapter['customFormatDate'] = 'L LT';
    } else {
      // this._adapter['customFormatDate'] = 'L';
    }

  }

  override writeValue(value) {
    if (value !== undefined && value !== null) {
      if (this.showTime){
        this.control.setValue((new Date(value)).toISOString());
      }
    }
  }

  dateInputChanged($event): any {
    //console.log($event);
    let value = null;

    if ($event !== undefined) {
      if ($event instanceof Date) {
        value = $event;
      }else if (typeof $event === 'string' && $event !== '' ) {
        const date = new Date($event);
        value = date; // GlobalUtil.convertUTCDateToLocalDate(date);
      } else if ($event.value !== undefined && typeof $event.value === 'string' && $event.value !== '') {
        const date = new Date($event.value);
        value = date; // GlobalUtil.convertUTCDateToLocalDate(date);
      } else if ($event.target.valueAsDate !== undefined && $event.target.valueAsDate !== null && $event.valueAsDate !== '') {
        if (!this.showTime) {
          value = this.getDateUTC($event.target.valueAsDate);
        } else {
          value = $event.target.valueAsDate;
        }
      } else if ($event.target.value !== undefined && $event.target.value !== null && $event.target.value !== '' ) {
        const date = new Date($event.target.value);
        value = date; // GlobalUtil.convertUTCDateToLocalDate(date);
      }
    }

    //console.log(value);
    return value;
  }

   onFocus(event) {
    setTimeout(() => {
      event.target.setSelectionRange(0, event.target.value?.length);
    });
   }

   onFocusOutDate(event) {
    const novaData = new Date();

    const aData = event.target?.value?.split('/');

    if (aData[0].trim() !== '') {
      const ano = aData[2].trim() === '' ? novaData.getFullYear() : Number(aData[2].trim());
      if (this.translate.currentLang === this.LANG_EN) {
        const mes = aData[0].trim() === '' ? (novaData.getMonth() + 1 ) : Number(aData[0].trim());
        const dia = Number(aData[1].trim());
        this.montarData(dia === 0 ? novaData.getDate() : dia, mes, ano);
      } else {
        const mes = aData[1].trim() === '' ? (novaData.getMonth() + 1 ) : Number(aData[1].trim());
        this.montarData(Number(aData[0].trim()), mes, ano);
      }
    } else {
      this.control.setValue(null, {emitEvent: false});
      this.selectDate.emit(null);
    }

   }

   montarData(dia, mes, ano){

    if (dia === 0) {
      this.inputDate = this.inputHour = Object.assign('', '');
      this.control.setValue(null, {emitEvent: false});
      this.selectDate.emit(null);
      return;
    }

    const data = new Date();
    mes = mes === 0 ? data.getMonth() : mes - 1;
    ano = ano === 0 ? data.getFullYear() : ano;

    let date = new Date(ano, mes, dia);

    if (this.control.value !== null && this.control.value !== undefined) {
      const oldDate = new Date(this.control.value);
      date.setHours(oldDate.getHours());
      date.setMinutes(oldDate.getMinutes());
    }

    this.validarDataHora(date);

   }

   onFocusOutHour(event) {
    const aHora = event.target?.value?.split(':');
    let hora = Number(aHora[0].trim());
    let min = Number(aHora[1].trim());

    if (this.control.value !== null && this.control.value !== undefined) {
      let date = new Date(this.control.value);
      date.setHours(hora);
      date.setMinutes(min);

      if (!this.validarDataHora(date)) {
        date.setHours(0);
        date.setMinutes(0);
        this.validarDataHora(date);
      }
    } else {
      this.inputHour = Object.assign('', '');
    }

   }

   preencherData(date) {
    const sDia = date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate().toString();
    const sMes = date.getMonth() < 9 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1);

    this.inputDate = '';
    setTimeout(() => {
      if (this.translate.currentLang === this.LANG_EN) {
        this.inputDate = sMes + '/' + sDia + '/' + date.getFullYear();
      } else {
        this.inputDate = sDia + '/' + sMes + '/' + date.getFullYear();
      }
    });
   }

   preencherHora(date) {
    const sHora = date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours().toString();
    const sMin = date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes().toString();

    this.inputHour = '';
    setTimeout(() => {
      this.inputHour = sHora + ':' + sMin;
    });
   }

   changeDate(event) {
    if (this.control.value === null || this.control.value === undefined) {
      this.control.value = new Date();
    }
    this.preencherData(new Date(this.control.value));
    this.preencherHora(new Date(this.control.value));
    this.control.setValue(new Date(this.control.value), {emitEvent: false});
    this.selectDate.emit(this.control.value);
   }

   validarDataHora(data) {
    if ((this.minDate !== null && data < this.minDate) || (this.maxDate !== null && data > this.maxDate)) {
      this.inputDate = this.inputHour = Object.assign('', '');
      this.control.setValue(null, {emitEvent: false});
      this.selectDate.emit(null);
      return false;
    }

    this.preencherData(data);
    this.preencherHora(data);
    this.control.setValue(null, {emitEvent: false});
    this.control.setValue(data, {emitEvent: false});
    this.selectDate.emit(data);
    return true;

   }

}
