import { Component, ChangeDetectionStrategy, inject, ElementRef, OnDestroy, DOCUMENT, input, output, signal, effect, computed, afterRenderEffect } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Color, ColorPickerControl, ChromePickerComponent } from '@iplab/ngx-color-picker';
import { ColorPickerModule } from '@iplab/ngx-color-picker';
import { TranslationPipe } from '@angulartoolsdr/translation';

@Component({
  selector: 'lib-chrome-wrapper',
  templateUrl: './chrome-wrapper.html',
  styleUrls: ['./chrome-wrapper.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class.open': 'isVisible()',
    '(click)': 'showColorPicker($event)'
  },
  imports: [ChromePickerComponent, ColorPickerModule, MatButton, TranslationPipe]
})
export class ChromeWrapper implements OnDestroy {

  color = input<string>();
  colorChange = output<any>();

  private readonly _color = signal<Color | null>(null);
  readonly isVisible = signal(false);

  // Armazena as coordenadas calculadas no momento do clique
  private readonly _portalPosition = signal<{ top: number; left: number } | null>(null);

  readonly colorHex = computed(() =>
    this._color()?.toHexString() ?? '#ffffff'
  );

  private _portalEl: HTMLElement | null = null;
  private _globalClickHandler: ((e: MouseEvent) => void) | null = null;

  readonly colorControl = new ColorPickerControl();

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly document = inject(DOCUMENT);

  constructor() {
    effect(() => {
      const colorVal = this.color();
      if (!colorVal) {
        this._color.set(null);
        return;
      }
      this.colorControl.setValueFrom(colorVal);
      this._color.set(this.colorControl.value);
    });

    // Resolve o problema: Executa de forma reativa e segura APÓS a re-renderização do DOM pelo Angular
    afterRenderEffect(() => {
      const visible = this.isVisible();
      const pos = this._portalPosition();

      // Se ficou visível e temos as coordenadas, movemos o elemento renderizado para o body
      if (visible && pos) {
        // Garantimos que a execução aconteça sincronizada com o ciclo de pintura limpo
        const internalPicker = this.el.nativeElement.querySelector('.picker-inner') as HTMLElement | null;
        if (internalPicker && !this._portalEl) {
          this._attachPortalToBody(pos.top, pos.left, internalPicker);
          this._registerGlobalClose();
        }
      }
    });
  }

  showColorPicker(event: MouseEvent): void {
    event.stopPropagation();

    if (this.isVisible()) {
      return;
    }

    const rect = this.el.nativeElement.getBoundingClientRect();
    const scrollY = this.document.defaultView?.scrollY ?? 0;
    const scrollX = this.document.defaultView?.scrollX ?? 0;

    // Guarda as posições em um estado reativo antes de mudar a visibilidade
    this._portalPosition.set({
      top: rect.bottom + scrollY + 6,
      left: rect.left + scrollX
    });

    this.isVisible.set(true);
  }

  applyClick(event: MouseEvent): void {
    event.stopPropagation();
    const currentVal = this.colorControl.value;
    this._color.set(currentVal);
    const hexString = currentVal ? currentVal.toHexString().toLowerCase() : null;
    this.colorChange.emit(hexString);
    this._close();
  }

  discardClick(event: MouseEvent): void {
    event.stopPropagation();
    this._close();
  }

  private _attachPortalToBody(top: number, left: number, internalPicker: HTMLElement): void {
    const portal = this.document.createElement('div');
    portal.className = 'lib-chrome-picker-portal';
    portal.style.position = 'absolute';
    portal.style.top = `${top}px`;
    portal.style.left = `${left}px`;
    portal.style.zIndex = '9999'; // Garante sobreposição correta fora do fluxo de escopo local

    portal.appendChild(internalPicker);
    this.document.body.appendChild(portal);
    this._portalEl = portal;
  }

  private _registerGlobalClose(): void {
    this._removeGlobalClose();

    this._globalClickHandler = (e: MouseEvent) => {
      if (this._portalEl && this._portalEl.contains(e.target as Node)) {
        return;
      }
      if (this.el.nativeElement.contains(e.target as Node)) {
        return;
      }
      this._close();
    };

    this.document.addEventListener('click', this._globalClickHandler, true);
  }

  private _removeGlobalClose(): void {
    if (this._globalClickHandler) {
      this.document.removeEventListener('click', this._globalClickHandler, true);
      this._globalClickHandler = null;
    }
  }

  private _close(): void {
    if (this._portalEl) {
      const inner = this._portalEl.querySelector('.picker-inner');
      if (inner) {
        this.el.nativeElement.appendChild(inner);
      }
      this._portalEl.remove();
      this._portalEl = null;
    }
    this._removeGlobalClose();
    this._portalPosition.set(null);
    this.isVisible.set(false);
  }

  ngOnDestroy(): void {
    if (this._portalEl) {
      this._portalEl.remove();
      this._portalEl = null;
    }
    this._removeGlobalClose();
  }
}
