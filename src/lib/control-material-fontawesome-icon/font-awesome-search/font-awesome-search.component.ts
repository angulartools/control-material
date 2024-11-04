import { FontAwesomeSearchService } from './font-awesome-search.service';
import { MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { AfterContentInit, Component, OnInit } from '@angular/core';
import { Observable, debounceTime, distinctUntilChanged, startWith } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatTooltip } from '@angular/material/tooltip';
import { MatButton } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatButtonToggleGroup, MatButtonToggle } from '@angular/material/button-toggle';
import { ControlMaterialComponent } from '../../control-material.component';

@Component({
    selector: 'te-font-awesome-search',
    templateUrl: './font-awesome-search.component.html',
    styleUrls: ['./font-awesome-search.component.scss'],
    providers: [FontAwesomeSearchService],
    standalone: true,
    imports: [MatDialogTitle, MatButtonToggleGroup, MatButtonToggle, MatDialogContent, FormsModule, ReactiveFormsModule, ControlMaterialComponent, MatProgressSpinner, MatButton, MatTooltip, MatDialogActions, MatButton, TranslateModule]
})

export class FontAwesomeSearchComponent implements OnInit, AfterContentInit {

  selectedIcon = null;
  filteredOptions: Observable<any[]>;

  nomesIcones;
  itensPorPagina = 18;
  listaIcones = [];
  loading = true;

  viewTypes = [
    {id: 1, name: 'LARGE', icon: 'fa-solid fa-grid-2', qtdItens: 6, columnSize: 2, classe: 'large-icon-button', size: '3', fontSize: '.8em'},
    {id: 2, name: 'MIDI', icon: 'fa-solid fa-grid', qtdItens: 9, columnSize: 1, classe: 'midi-icon-button', size: '2', fontSize: '.65em'},
    {id: 3, name: 'SMALL', icon: 'fa-solid fa-list-ul', qtdItens: 6, columnSize: 2, classe: 'small-icon-button', size: '1', fontSize: '.7em'}
  ];
  viewTypeSelected = this.viewTypes[0];

  searchForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<FontAwesomeSearchComponent>,
              private formBuilder: FormBuilder,
              private service: FontAwesomeSearchService) {
    //this.service.getIcons('donut').then(res => console.log(res));
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.searchForm = this.formBuilder.group({
      search: this.formBuilder.control(null, Validators.required)
    });
  }

  protected salvar() {
    this.dialogRef.close(this.selectedIcon);
  }

  closeDialog() {
    this.dialogRef.close(null);
  }

  ngAfterContentInit() {

    this.searchForm.get('search').valueChanges
      .pipe(
        startWith(''),
        debounceTime(1000),
        distinctUntilChanged(),
      ).subscribe(res => {
        this.buscarIconesApi(res);
      });
  }



  async buscarIconesApi(nome, showMore = false) {
    this.loading = showMore ? false : true;
    nome = nome === null || nome === '' ? 'tem' : nome;
    const data = await this.service.getIcons(nome, this.itensPorPagina);
    this.listaIcones = showMore === false ? [] : this.listaIcones;
    //console.log(data['data']['search'])
    if (data !== null && data['data']['search'].length > 0) {
      const icones = data['data']['search'];
      for(let i=0; i<icones.length; i++) {
        const family = icones[i].familyStylesByLicense.pro;
        //for (let j=0; j<family.length; j++) {
          if (family.findIndex(x => x.family === 'classic' && x.style === 'solid') > -1) {
            const item = {
              id: i,
              //classe: 'fa-' + family[j].style + (family[j].family === 'classic' ? '' : ' fa-'+family[j].family) + ' fa-'+icones[i].id,
              classe: 'fas fa-'+icones[i].id,
              nome: icones[i].id
            }
            if (showMore) {
              if (this.listaIcones.findIndex(x => x.classe === item.classe) === -1) {
                this.listaIcones.push(item);
              }
            } else {
              this.listaIcones.push(item);
            }
          }
        //}
      }
    }
    this.loading = false;
  }

  selecionarIcone(icone) {
    //console.log(icone)
    if (this.selectedIcon !== null) {
      if (this.selectedIcon.classe === icone.classe) {
        this.selectedIcon = null;
      } else {
        this.selectedIcon = icone;
      }
    } else {
      this.selectedIcon = icone;
    }
  }

  showMore() {
    this.itensPorPagina += 6;
    this.buscarIconesApi(this.searchForm.get('search').value, true);
  }


}
