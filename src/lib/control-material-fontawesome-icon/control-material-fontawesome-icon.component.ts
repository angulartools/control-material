import { startWith } from 'rxjs/operators';
import { Observable, map } from 'rxjs';
import { ControlMaterialComponent } from './../control-material.component';
import { NG_VALUE_ACCESSOR, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, forwardRef, AfterContentInit, Input, Output, EventEmitter } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/pro-solid-svg-icons';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FontAwesomeSearchComponent } from './font-awesome-search/font-awesome-search.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgClass, AsyncPipe, DatePipe } from '@angular/common';
import { MatOption } from '@angular/material/core';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import { MatAutocompleteTrigger, MatAutocomplete } from '@angular/material/autocomplete';
import { MatInput } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatFormField, MatLabel, MatSuffix, MatPrefix, MatError } from '@angular/material/form-field';

@Component({
    selector: 'lib-control-material-fontawesome-icon',
    templateUrl: './control-material-fontawesome-icon.component.html',
    styleUrls: ['../control-material.component.scss', './control-material-fontawesome-icon.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ControlMaterialFontawesomeIconComponent), // replace name as appropriate
            multi: true
        }
    ],
    standalone: true,
    imports: [MatFormField, MatLabel, MatProgressSpinner, MatSuffix, MatInput, FormsModule, MatAutocompleteTrigger, ReactiveFormsModule, MatPrefix, MatIcon, MatTooltip, MatIconButton, NgbPopover, MatError, MatAutocomplete, MatOption, NgClass, AsyncPipe, DatePipe, TranslateModule]
})
export class ControlMaterialFontawesomeIconComponent extends ControlMaterialComponent implements AfterContentInit {

  filteredOptions: Observable<any[]>;
  loading = false;
  loadingData = false;

  bindIconField = 'classe';
  nomesIcones;

  library;
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

  constructor(private dialog: MatDialog) {
    super();
    this.library = library;
    this.library.add(fas);
    this.icones = Object.keys(library['definitions'].fas);
  }

  override ngAfterContentInit() {
    super.ngAfterContentInit();

    this.filteredOptions = this.control.valueChanges
      .pipe(
        startWith(''),
        map(value => this.buscarIcones(value)),
      );

      if (this.required) {
        this.control.setValidators([Validators.required]);
      }
  }

  buscarIcones(nome) {
    //console.log('nome', nome)
    let listaIcones = [];

    if (nome !== null) {
      this.nomesIcones = this.icones.map(x => {return {name: 'fa-'+x}});
      let incluiu = 0;
      if (nome instanceof Object) {
        listaIcones = [nome];
      } else {
        if (typeof nome === 'string') {
          const filterValue = nome.toLowerCase();
          for (let i=0; i<this.nomesIcones.length; i++) {
            if (this.nomesIcones[i].name.indexOf(filterValue) > -1) {
              const item = {
                id: i,
                classe: 'fas '+this.nomesIcones[i].name,
                nome: this.nomesIcones[i].name}
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

}
