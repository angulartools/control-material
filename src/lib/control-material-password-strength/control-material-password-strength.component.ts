import { MatListModule } from '@angular/material/list';
import { MatIconButton } from '@angular/material/button';
import { FontAwesomeSharedModule } from '../font-awesome.module';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { ControlMaterialPasswordComponent } from '../control-material-password/control-material-password.component';
import { ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatError, MatFormField, MatHint, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { TranslationPipe } from '@angulartoolsdr/translation';
import { MatCard } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
    selector: 'lib-control-material-password-strength',
    templateUrl: './control-material-password-strength.component.html',
    styleUrls: ['./control-material-password-strength.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { '[id]': 'id' },
    imports: [
      MatListModule, MatCard, MatProgressBarModule, MatFormField, MatLabel, MatInput, FormsModule, ReactiveFormsModule, MatPrefix, MatIconModule, MatSuffix, MatTooltip, MatError, MatIconButton, MatHint, TranslationPipe,
      FontAwesomeSharedModule
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ControlMaterialPasswordStrengthComponent),
            multi: true
        },
    ]
})
export class ControlMaterialPasswordStrengthComponent extends ControlMaterialPasswordComponent {

  override id = `lib-control-material-password-strength-${ControlMaterialPasswordStrengthComponent.nextId++}`;

  @Input('password')
  set setPassword(value: any) {
    //console.log('nova-senha',value)
    this.verifyStrength(value);
  }

  @Input() min: number = 12;
  @Input() max: number = 128;
  @Input() lowercase: boolean = true;
  @Input() uppercase: boolean = true;
  @Input() symbol: boolean = true;
  @Input() number: boolean  = true;
  @Input() customChars: boolean  = true;

  @Input() minChars = true;
  @Input() maxChars = false;
  @Input() showInfo: boolean = true;

  @Input() lowerCaseCriteriaMsg: string;
  @Input() upperCaseCriteriaMsg: string;
  @Input() digitsCriteriaMsg: string;
  @Input() specialCharsCriteriaMsg: string;
  @Input() minCharsCriteriaMsg: string;
  @Input() customCharsCriteriaMsg: any;

  @Output() passwordChanged = new EventEmitter();

  criterias : any[] = [];

  progressColor = 'danger';
  progressValue = 0;

  constructor(private cdr: ChangeDetectorRef) {
    super();

    this.criterias = [];

    this.criterias.push({name: 'lowercase', value: this.lowercase, regex: /[a-z]+/, isValid: false});
    this.criterias.push({name: 'uppercase', value:  this.uppercase, regex: /[A-Z]+/, isValid: false});
    this.criterias.push({name: 'number', value:  this.number, regex: /[0-9]+/, isValid: false});
    this.criterias.push({name: 'symbol', value:  this.symbol, regex: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, isValid: false});
    this.criterias.push({name: 'minChars', value: this.minChars, isValid: false});
    this.criterias.push({name: 'maxChars', value: this.maxChars, isValid: false});
    this.criterias.push({name: 'customChars', value: this.customChars, regex: /^(?!.*(.)\1{2})(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[a-z])(?=.*[A-Z]).{12,128}$/, isValid: false});
  }

  verifyStrength(password: string) {

    if (password !== undefined && password !== null && password !== "") {
      let force = 0;
      const total = (this.criterias.filter(x => x.value === true)).length;

      for (let i = 0; i< this.criterias.length; i++) {
        if (this.criterias[i].value === true) {
          if (this.criterias[i].regex !== undefined) {
            if ((new RegExp(this.criterias[i].regex)).test(password)) {
              force++;
              this.criterias[i].isValid = true;
            } else {
              this.criterias[i].isValid = false;
            }
          } else {
            if (this.criterias[i].name === 'minChars') {
              if (password.length >= this.min) {
                force++;
                this.criterias[i].isValid = true;
              } else {
                this.criterias[i].isValid = false;
              }
            }
          }
        } else {
          this.criterias[i].isValid = true;
        }
      }
      this.progressValue = force/total;
      this.setProgressColor();
    } else {
      for (let i = 0; i< this.criterias.length; i++) {
        if (this.criterias[i].value === true) {
          this.criterias[i].isValid = false;
        }
      }
      this.progressValue = 0;
      this.setProgressColor();
    }

    this.passwordChanged.emit(this.progressValue*100);

  }

  setProgressColor() {
    const successColor = '#3ca969';
    const warningColor = '#fabb44';
    const dangerColor = '#f14c51';

    const value = this.progressValue*100;
    if (value <= 25) {
      this.progressColor = dangerColor;
    } else if (value === 100) {
      this.progressColor = successColor;
    } else {
      this.progressColor = warningColor;
    }
    if (this.control !== undefined && this.control !== null) {
      this.cdr.detectChanges();
    }
  }

  isValid(type: string) {
    return (this.criterias.find(x => x.name === type)).isValid === true;
  }
}
