import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlMaterialNumberComponent } from './control-material-number.component';

describe('ControlMaterialNumberComponent', () => {
  let component: ControlMaterialNumberComponent;
  let fixture: ComponentFixture<ControlMaterialNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlMaterialNumberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlMaterialNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
