import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlMaterialComponent } from './control-material.component';

describe('ControlMaterialComponent', () => {
  let component: ControlMaterialComponent;
  let fixture: ComponentFixture<ControlMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlMaterialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
