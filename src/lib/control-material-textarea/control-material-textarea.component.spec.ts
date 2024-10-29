import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlMaterialTextareaComponent } from './control-material-textarea.component';

describe('ControlMaterialTextareaComponent', () => {
  let component: ControlMaterialTextareaComponent;
  let fixture: ComponentFixture<ControlMaterialTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlMaterialTextareaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlMaterialTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
