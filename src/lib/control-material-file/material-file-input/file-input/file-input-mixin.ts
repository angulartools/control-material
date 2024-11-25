import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { ErrorStateMatcher,  mixinErrorState } from '@angular/material/core';
import { Subject } from "rxjs";

// Boilerplate for applying mixins to FileInput
/** @docs-private */
export class FileInputBase {
  errorState: boolean = false; // Estado de erro atual
  stateChanges = new Subject<void>(); // Emissor de mudanças de estado

  constructor(
    public _defaultErrorStateMatcher: ErrorStateMatcher,
    public _parentForm: NgForm,
    public _parentFormGroup: FormGroupDirective,
    public ngControl: NgControl
  ) {}

  // Implementação direta do updateErrorState
  updateErrorState(): void {
    const oldState = this.errorState; // Estado anterior
    const control : any = (this.ngControl ? this.ngControl.control : null);
    const parent : any = this._parentFormGroup || this._parentForm;

    // Atualiza o estado de erro
    this.errorState = this._defaultErrorStateMatcher.isErrorState(control, parent);

    // Emite mudanças no estado
    if (oldState !== this.errorState) {
      this.stateChanges.next();
    }
  }
}
