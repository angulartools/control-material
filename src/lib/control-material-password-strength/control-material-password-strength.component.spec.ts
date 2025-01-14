import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlMaterialPasswordComponent } from './control-material-password.component';

describe('ControlMaterialPasswordComponent', () => {
  let component: ControlMaterialPasswordComponent;
  let fixture: ComponentFixture<ControlMaterialPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlMaterialPasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlMaterialPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
