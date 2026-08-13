import { Observable, debounceTime, distinctUntilChanged, map, startWith } from 'rxjs';
import { ControlMaterialComponent } from './../control-material.component';
import { NG_VALUE_ACCESSOR, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, forwardRef, AfterContentInit, Input, Output, EventEmitter, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FontAwesomeSearchComponent } from './font-awesome-search/font-awesome-search.component';
import { TranslationPipe } from '@angulartoolsdr/translation';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatOption } from '@angular/material/core';
import { MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatAutocompleteTrigger, MatAutocomplete } from '@angular/material/autocomplete';
import { MatInput } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatFormField, MatLabel, MatSuffix, MatPrefix, MatError } from '@angular/material/form-field';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'lib-control-material-fontawesome-icon',
  templateUrl: './control-material-fontawesome-icon.component.html',
  styleUrls: ['../control-material.component.scss', './control-material-fontawesome-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[id]': 'id' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ControlMaterialFontawesomeIconComponent), // replace name as appropriate
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
    MatTooltip,
    MatIconButton,
    MatError,
    MatAutocomplete,
    MatOption,
    AsyncPipe,
    DatePipe,
    TranslationPipe, FontAwesomeModule
  ]
})
export class ControlMaterialFontawesomeIconComponent extends ControlMaterialComponent implements AfterContentInit, OnInit {

  override id = `lib-control-material-fontawesome-icon-${ControlMaterialFontawesomeIconComponent.nextId++}`;

  filteredOptions: Observable<any[]>;
  loading = false;
  loadingData = false;

  bindIconField = 'classe';
  nomesIcones;

  icones;

  @Input() showId = false;
  @Input() bindId = 'id';
  @Input() bindLabel = 'nome';
  @Input() bindArray = [];
  @Input() showLabel = false;
  @Input() smallText = false;
  @Input() largeData = true;

  @Output() selectItem: EventEmitter<any> = new EventEmitter();
  @Output() clearItem: EventEmitter<any> = new EventEmitter();

  library = inject(FaIconLibrary);
  dialog = inject(MatDialog);

  ngOnInit(): void {
    this.icones = this.getIcons();
  }

  getIcons(): string[] {
    const definitions = (this.library as any)['definitions']?.fas || {};
    return Object.keys(definitions);
  }

  override ngAfterContentInit() {
    super.ngAfterContentInit();

    this.filteredOptions = this.control.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        startWith(''),
        map(value => this.buscarIcones(value)),
      );

    if (this.required) {
      this.control.setValidators([Validators.required]);
    }
  }

  buscarIcones(nome) {
    //console.log('nome', nome)
    let listaIcones: any[] = [];

    if (this.icones != null) {

      if (nome !== null) {
        this.nomesIcones = this.icones.map(x => { return { name: 'fa-' + x } });
        let incluiu = 0;
        if (nome instanceof Object) {
          listaIcones = [nome];
        } else {
          if (typeof nome === 'string') {
            const filterValue = nome.toLowerCase();
            for (let i = 0; i < this.nomesIcones.length; i++) {
              if (this.nomesIcones[i].name.indexOf(filterValue) > -1) {
                const item = {
                  id: i,
                  classe: 'fas ' + this.nomesIcones[i].name,
                  nome: this.nomesIcones[i].name
                }
                //unicode: this.nomesIcones[i].unicode}
                listaIcones.push(item);
                incluiu++;
              }
              if (incluiu >= 15) {
                return listaIcones;
              }
            }
          } else {
            return this.buscarIcones('');
          }
        }
      } else {
        return this.buscarIcones('');
      }
      return listaIcones;
    }
    return null;
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.width = 'inherit';
    dialogConfig.maxWidth = 900;
    dialogConfig.autoFocus = true;
    dialogConfig.position = {
      top: '120px'
    };
    dialogConfig.data = {};
    const dialogRef = this.dialog.open(FontAwesomeSearchComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result !== null) {
        this.control.setValue(result);
      }
    });

  }

  displayBindLabel(value: any) {
    if (value) {
      return this.getLabel(value);
    }
  }

  getLabel(value) {
    if (value instanceof Object) {
      const objects = this.bindLabel.split('.');
      let retorno: string | null = null;
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

}
