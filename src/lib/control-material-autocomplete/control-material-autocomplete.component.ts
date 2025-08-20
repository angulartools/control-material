import { NG_VALUE_ACCESSOR, Validators, FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ControlMaterialComponent } from './../control-material.component';
import { Component, AfterContentInit, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { startWith, map } from 'rxjs/operators';
import { TranslationPipe } from '@angulartoolsdr/translation';
import { NgClass, AsyncPipe, DatePipe } from '@angular/common';
import { MatOption } from '@angular/material/core';
import { MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import { MatAutocompleteTrigger, MatAutocomplete } from '@angular/material/autocomplete';
import { MatInput } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatFormField, MatLabel, MatSuffix, MatPrefix, MatError } from '@angular/material/form-field';
import { FontAwesomeSharedModule } from '../font-awesome.module';

@Component({
    selector: 'lib-control-material-autocomplete',
    templateUrl: './control-material-autocomplete.component.html',
    styleUrls: ['../control-material.component.scss', './control-material-autocomplete.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ControlMaterialAutocompleteComponent), // replace name as appropriate
            multi: true
        }
    ],
    imports: [
      MatFormField, 
      MatLabel, 
      MatProgressSpinner, 
      MatSuffix, 
      MatInput, 
      FormsModule, 
      MatAutocompleteTrigger, 
      ReactiveFormsModule, 
      MatPrefix, 
      MatIcon, 
      MatTooltip, 
      MatIconButton, 
      MatError, 
      MatAutocomplete, 
      MatOption, 
      NgClass, 
      AsyncPipe, 
      DatePipe, 
      TranslationPipe,
      FontAwesomeSharedModule
    ]
})
export class ControlMaterialAutocompleteComponent extends ControlMaterialComponent implements AfterContentInit {

  filteredOptions: Observable<any[]>;
  _selectList = [];
  loading = false;
  loadingData = false;

  @Input() showId = false;
  @Input() showLabel = false;

  @Input() bindId = 'id';
  @Input() bindLabel = 'nome';
  @Input() bindArray = [];
  @Input() bindImageField = null;
  @Input() bindIconField = null;

  @Input() observableList: Observable<any>;
  @Input() disableClear = false;
  @Input() largeData = true;

  @Input('loading') setLoading(value) {
    this.loading = value;
    this.loadingData = value;
  }

  @Input() smallText = false;

  @Input('selectList')
  set selectList(value) {
    const changed = this._selectList !== undefined && this._selectList !== null && this._selectList.length > 0 && this._selectList !== value;
    this._selectList = value;
    this.filteredOptions = of(value);
    if (value !== undefined && value !== null && value.length > 0) {
      if (this.control !== undefined) {
        if (this._selectList !== undefined && this._selectList !== null && this._selectList.length > 0) {
          this.loadingData =  true;
          if (this.control.value !== undefined && this.control.value !== null && this.control.value !== '') {
            if (this.control.value instanceof Object) {
              const value = this._selectList.find(x => x[this.bindId] === this.control.value[this.bindId]);
              if (value !== undefined && value !== null) {
                this.control.setValue(value);
              }
            } else {
              this.control.setValue(this.control.value);
            }

            this.selectItem.emit(this.control.value);
          } else {
            this.control.setValue(null);
          }

          this.filteredOptions = this.control.valueChanges
          .pipe(
            startWith(''),
            //map(value => typeof value === 'string' || value === null ? value : this.getLabel(value)),
            map(value => typeof value === 'string' ? this._filter(value) : this._selectList),
          );
        }
        this.loadingData = false;
      }
    }
  }

  @Output() selectItem: EventEmitter<any> = new EventEmitter();
  @Output() clearItem: EventEmitter<any> = new EventEmitter();

  override ngAfterContentInit() {
    super.ngAfterContentInit();

    this.updateObservableList();

    this.filteredOptions = this.control.valueChanges
      .pipe(
        startWith(''),
        //map(value => typeof value === 'string' || value === null ? value : this.getLabel(value)),
        map(value => typeof value === 'string' ? this._filter(value) : this._selectList),
      );

      if (this.required) {
        this.control.setValidators([Validators.required, searchControlValidator]);
      }
  }

  updateObservableList() {
    if (this.observableList !== undefined) {
      this.loading = true;
      this.loadingData =  true;
        this.observableList
        .subscribe(response => {
          this._selectList = response;
          if (response !== undefined && response !== null && response.length > 0) {
            if (this.control.value !== undefined && this.control.value !== null && this.control.value !== '') {
              if (this.control.value instanceof Object) {
                const value = this._selectList.find(x => x[this.bindId] === this.control.value[this.bindId]);
                if (value !== undefined && value !== null) {
                  this.control.setValue(value);
                } else {
                  this.control.setValue(this.control.value);
                }
              } else {
                this.control.setValue(this.control.value);
              }

              this.selectItem.emit(this.control.value);
            } else {
              this.control.setValue(null);
            }
          }
          this.loadingData = false;
          this.loading = false;
        });
    }
  }

  displayBindLabel(value: any) {
    if (value) {
      return this.getLabel(value);
    }
  }

  getLabel(value) {
    if (value instanceof Object) {
      const objects = this.bindLabel.split('.');
      let retorno = null;
      objects.forEach(element => {
        retorno = retorno === null ? value[element] : retorno[element];
      });

      if (this.showId) {
        retorno = value[this.bindId] + ' - ' + retorno;
      }

      return retorno;
    } else {
      return value[this.bindLabel];
    }
  }

  limparItem($event) {
    if (this.control.value !== undefined && this.control.value !== null && this.control.value !== '') {
      $event.stopPropagation();
      this.control.setValue(null);
      this.clearItem.emit();
    }
  }

  optionSelected($event) {
    this.selectItem.emit($event.option.value);
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    if (this._selectList !== undefined && this._selectList !== null && this._selectList.length > 0) {
      return this._selectList.filter(option => this.getLabel(option).toLowerCase().indexOf(filterValue) > -1);
    }
    return [];
  }

}

export function searchControlValidator(control: AbstractControl) {
  if (control.value !== undefined && control.value !== null && !(control.value instanceof Object)) {
    return { valueControlInvalid: true };
  }
  return null;
}
