import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlMaterialTimeComponent } from './control-material-time.component';

describe('ControlMaterialtimeComponent', () => {
  let component: ControlMaterialTimeComponent;
  let fixture: ComponentFixture<ControlMaterialTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlMaterialTimeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlMaterialTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
