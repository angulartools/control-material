import { Component, Input, Output, EventEmitter, ViewChild, OnChanges, SimpleChanges, inject } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel, MatSuffix, MatError, MatHint } from '@angular/material/form-field';
import { ToastrService } from 'ngx-toastr';
import { FileInputComponent } from './material-file-input/file-input/file-input.component';
import { FileInput } from './material-file-input/model/file-input.model';
import { ControlMaterialComponent } from '../control-material.component';

@Component({
    selector: 'lib-control-material-file',
    templateUrl: './control-material-file.component.html',
    styleUrls: ['./control-material-file.component.scss'],
    imports: [MatFormField, MatLabel, FileInputComponent, FormsModule, ReactiveFormsModule, MatIconButton, MatSuffix, MatIcon, MatError, MatHint, MatInput]
})
export class ControlMaterialFileComponent extends ControlMaterialComponent implements OnChanges {

  selectedFiles: any;
  image: any;

  @Input() extensao: [string?] = [];
  @Input() filename = this.translate.instant('SELECIONAR_ARQUIVO');
  @Input() maxSize = 100000000;
  @Input() file: any;
  @Input() imageHeight = '44px';
  @Input() imageWidth = 'auto';
  @Input() imageClass = '';
  @Input() nome = 'logo';
  @Input() hint = null;

  @Output() selectedFile: EventEmitter<any> = new EventEmitter();

  @ViewChild('inputFile') inputFile: FileInputComponent;

  protected toastrService = inject(ToastrService);

  constructor() {
    super();
    this.placeholder = this.filename;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['file']) {
      this.updateImage();
    }
  }

  updateImage() {
    if (this.file !== undefined && this.file !== null && this.file.toString().length > 0) {

      // atualiza imagem renderizada
      fetch(this.file)
        .then(res => res.blob())
        .then(blob => {
          let blobFile = this.blobToFile(blob, this.nome);
          this.resizeImage(blobFile, 1040, 1040).then( resI => {
            blobFile = this.blobToFile(resI, this.nome);
          },
          error => {
            console.log('error:', error);
          });
          this.renderImage(blobFile, this.file);
          // atualiza campo com o nome da imagem
          const arquivos: File[] = [];
          arquivos.push(blobFile);

          const arquivo: FileInput = new FileInput(arquivos);

          if (this.formControlName !== undefined) {
            this.formControlName.control.setValue(arquivo);
          } else if (this.control !== undefined) {
            this.control.value = arquivo;
          }

          if (this.selectedFiles !== undefined && this.selectedFiles !== null && this.selectedFiles.length > 0) {
            this.selectedFiles[0] = blobFile;
          } else {
            this.selectedFiles = [];
            this.selectedFiles.push(blobFile);
          }
        });
    } else {
      if (this.formControlName !== undefined) {
        this.formControlName.control.setValue(null);
      } else if (this.control !== undefined) {
        this.control.value = null;
      }
      this.image = null;
    }
  }

  selectFile($event) {
    const arquivos = $event.target.files;
    if (arquivos && arquivos.length) {
      if (arquivos[0].size > this.maxSize) {

        this.toastrService.warning(this.translate.instant('TAMANHO_IMAGEM_EXCEDIDA', {valor: this.maxSize}));

        if (this.formControlName !== undefined) {
          this.formControlName.control.setValue(null);
          this.formControlName.control.updateValueAndValidity();
        } else if (this.control !== undefined) {
          this.control.value = null;
          this.control.updateValueAndValidity();
        }
        this.image = undefined;
        $event.preventDefault();
        return;
      }
      if (this.extensao.length > 0) {
        if (this.extensao.indexOf(arquivos[0].type.split('/')[1]) === -1) {
          this.toastrService.warning(this.translate.instant('EXTENSAO_ARQUIVO_NAO_PERMITIDA', {extensao: this.extensao}));

          if (this.formControlName !== undefined) {
            this.formControlName.control.setValue(null);
            this.formControlName.control.updateValueAndValidity();
          } else if (this.control !== undefined) {
            this.control.value = null;
            this.control.updateValueAndValidity();
          }
          this.image = undefined;
          $event.preventDefault();
          return;
        }
      }
      if (arquivos[0].type.indexOf('image') > -1) {
        this.resizeImage(arquivos[0], 1040, 1040).then( resI => {

          if (this.selectedFiles !== undefined && this.selectedFiles !== null && this.selectedFiles.length > 0) {
            this.selectedFiles[0] = <File>resI;
          } else {
            this.selectedFiles = [];
            this.selectedFiles.push(<File>resI);
          }

          const reader = new FileReader();
          reader.onload = () => {
            this.renderImage(this.selectedFiles[0], reader.result);
          };
          reader.readAsDataURL(this.selectedFiles[0]);
        },
        error => {
          console.log('error:', error);
        });
      } else {
        this.selectedFiles = arquivos;
      }


      // this.selectedFiles = arquivos;
      /* this.placeholder = arquivos[0].name;
      this.formControlName.control.setValue(arquivos);
      this.formControlName.control.updateValueAndValidity();
      this.inputFile['value'] = this.formControlName.value;*/

      // const reader = new FileReader();
      // reader.onload = () => {
      //   this.renderImage(this.selectedFiles[0], reader.result);
      // };
      // reader.readAsDataURL(this.selectedFiles[0]);
    } else {
      this.image = undefined;
    }

    this.selectedFile.emit($event);
  }

  private renderImage(arquivo: File, imagem: any) {
    if (arquivo.type.split('/')[0] === 'image') {
      this.image = imagem;
    } else {
      this.image = undefined;
    }
  }

  private blobToFile = (theBlob: Blob, fileName: string): File => {
    const b: any = theBlob;
    b.lastModifiedDate = new Date();
    b.name = fileName !== null ? fileName.indexOf('.') === -1 ? fileName + '.' + theBlob.type.split('/')[1] : fileName : null;
    return <File>theBlob;
  }

  private resizeImage(file:File, maxWidth:number, maxHeight:number):Promise<Blob> {
    return new Promise((resolve, reject) => {
        let image = new Image();
        image.src = URL.createObjectURL(file);
        image.onload = () => {
            let width = image.width;
            let height = image.height;

            if (width <= maxWidth && height <= maxHeight) {
                resolve(file);
            }

            let newWidth;
            let newHeight;

            if (width > height) {
                newHeight = height * (maxWidth / width);
                newWidth = maxWidth;
            } else {
                newWidth = width * (maxHeight / height);
                newHeight = maxHeight;
            }

            let canvas = document.createElement('canvas');
            canvas.width = newWidth;
            canvas.height = newHeight;

            let context = canvas.getContext('2d');

            context.drawImage(image, 0, 0, newWidth, newHeight);

            canvas.toBlob(resolve, file.type);
        };
        image.onerror = reject;
    });
  }
}
