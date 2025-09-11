import { NG_VALUE_ACCESSOR, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AfterContentInit, Component, forwardRef, Input, ChangeDetectionStrategy } from '@angular/core';
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
import { ControlMaterialAutocompleteComponent, searchControlValidator } from '../control-material-autocomplete/control-material-autocomplete.component';
import { catchError, debounceTime, distinctUntilChanged, filter, Observable, of, switchMap, tap } from 'rxjs';

@Component({
    selector: 'lib-control-material-search',
    templateUrl: './control-material-search.component.html',
    styleUrls: ['../control-material.component.scss', '../control-material-autocomplete/control-material-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { '[id]': 'id' },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ControlMaterialSearchComponent), // replace name as appropriate
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
      TranslationPipe
    ]
})
export class ControlMaterialSearchComponent extends ControlMaterialAutocompleteComponent implements AfterContentInit {

  override id = `lib-control-material-search-${ControlMaterialSearchComponent.nextId++}`;

  @Input() service: any;
  @Input() metodo = 'pesquisar';
  @Input() filtrarNulo = false;

  @Input('parametroPesquisa')
  set setParametroPesquisa(value) {
    this.parametroPesquisa = value;
  }
  parametroPesquisa = null;
  filteredSearch: Observable<any>;
  searchFailed = false;

  get value() {
    return this.control.value;
  }

  set value(val) {
    this.control.setValue(val);

    this.onChange(val);
    this.onTouched();
  }

  override ngAfterContentInit() {
    super.ngAfterContentInit();

    if (this.control !== undefined){
      if (this.required) {
        this.control.setValidators([Validators.required, searchControlValidator]);
      }

      if (this.parametroPesquisa !== undefined) {
        this.filteredSearch = this.control.valueChanges
        .pipe(
          debounceTime(300),
          distinctUntilChanged(),
          tap(() =>
          {
            this.loading = true;
            this.loadingData =  true;
          }),
          switchMap((value: any) =>
            this.service[this.metodo](value === '' || value === null || value[this.bindLabel] === undefined ? value : value[this.bindLabel], this.parametroPesquisa, this.bindId).pipe(
              tap(() => {
                this.searchFailed = false;
                this.loading = false;
                this.loadingData =  false;
              }),
              catchError(() => {
                this.searchFailed = true;
                this.loading = false;
                this.loadingData =  false;
                return of([]);
              }))
          ),
        );
      } else {
        this.filteredSearch = this.control.valueChanges
        .pipe(
          debounceTime(300),
          distinctUntilChanged(),
          filter(value => value !== '' && value !== null && !this.filtrarNulo),
          tap(() =>
          {
            this.loading = true;
            this.loadingData =  true;
          }),
          switchMap((value: any) =>
            this.service[this.metodo](value[this.bindLabel] === undefined ? value : value[this.bindLabel], this.bindId).pipe(
              tap(() => {
                this.searchFailed = false;
                this.loading = false;
                this.loadingData =  false;
              }),
              catchError(() => {
                this.searchFailed = true;
                this.loading = false;
                this.loadingData =  false;
                return of([]);
              }))
          ),
        );
      }
    }
  }
}
